window.socialIcons.setup.githubUrl = "https://github.com/s-a/iron-node/";
window.socialIcons.setup.media = "https://raw.githubusercontent.com/s-a/iron-node/master/screenshot.jpg";
window.socialIcons.setup.url = "http://s-a.github.io/iron-node/";
window.socialIcons.setup.title = "Dead simple Node.js code debugging";
var socialIconClick = function(url) {
	return function() {
		opener(url);
	};
};

window.addEventListener('load',function(){
	var btn = document.getElementsByClassName("social-share-button");
	for (var i = 0; i < btn.length; i++) {
		btn[i].onclick = socialIconClick(btn[i].href);
		btn[i].href = "javascript:void(0)";
	}
},false); //W3C
