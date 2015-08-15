
var fs = require("fs");



var cfg = require("./ico/.scream.js");
var css = [];

var count = 0;
for (var x in cfg.images) {
	if (cfg.images.hasOwnProperty(x)) {
		console.log(x);
		count++;
	}
}

var onePercent = (100/count)+0.4;
var percent= onePercent*-1;
var icons = [];
var md = ["#Social Networks"];

for (var fn in cfg.images) {
	if (cfg.images.hasOwnProperty(fn)) {
		var cls = fn.replace("-128.png", "").split(".")[0];

		percent += onePercent;
		css.push(".social-icon-"+cls+"{");
		css.push("	background-position:0 " + percent + (percent === 0 ? "" : "%") + ";");
		if (cfg.images[fn].color){
			css.push("	background-color:"+ (cfg.images[fn].color || "yellow") + ";");
		}
		css.push("}");

		md.push(" - [" + cls + "](" + cfg.images[fn].url + ")");

		var setup = cfg.images[fn];
		icons.push({name:cls, color:setup.color, url: setup.url});
	}
}


var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();

md.push("");
md.push("***Updated: " + curr_date + "-" + m_names[curr_month] + "-" + curr_year + "***");

fs.writeFileSync("social-icon.css", css.join("\n"));
fs.writeFileSync("social-icon-list.js", "window.socialIcons={};window.socialIcons.list="+ JSON.stringify(icons)+ ";");
fs.writeFileSync("social-networks.MD", md.join("\n"));