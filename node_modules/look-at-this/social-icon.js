// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
	var cache = {};
	var i;
	var tmpl = function(str, data){
	  // Figure out if we're getting a template, or if we need to
	  // load the template - and be sure to cache the result.
	  var fn = !/\W/.test(str) ?
	    cache[str] = cache[str] ||
	      tmpl(document.getElementById(str).innerHTML) :

	    // Generate a reusable function that will serve as a template
	    // generator (and which will be cached).
	    new Function("obj",
	      "var p=[],print=function(){p.push.apply(p,arguments);};" +

	      // Introduce the data as local variables using with(){}
	      "with(obj){p.push('" +

	      // Convert the template into pure JavaScript
	      str
	        .replace(/[\r\t\n]/g, " ")
	        .split("<%").join("\t")
	        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	        .replace(/\t=(.*?)%>/g, "',$1,'")
	        .split("\t").join("');")
	        .split("%>").join("p.push('")
	        .split("\r").join("\\'") + "');}return p.join('');");

	  // Provide some basic currying to the user
	  return data ? fn( data ) : fn;
	};

	var getIconSetup = function(name) {
		for (var i = 0; i < window.socialIcons.list.length; i++) {
			var icon = window.socialIcons.list[i];
			if (icon.name === name){
				return icon;
			}
		}
		throw "Icon setup " + name + " not found";
	};
/*
	var onShareButtonClickEvent = function() {
		window.open(this.href);
		return false;
	};
*/
	var renderTemplateData = function() {
		var container = document.getElementById("social-icons");
		var templateData = {icons:[]};

		var customNetworkList = container.getAttribute("data-networks");

		if (customNetworkList){
			customNetworkList = customNetworkList.split(",");
			for (i = 0; i < customNetworkList.length; i++) {
				var nw = customNetworkList[i];
				nw = getIconSetup(nw);
				templateData.icons.push({name:nw.name});
			}
		} else {
			for (i = 0; i < window.socialIcons.list.length; i++) {
				var icon = window.socialIcons.list[i];
				templateData.icons.push({name:icon.name});
			}
		}


		var tpl = "social_icon_template";
		if (!document.getElementById(tpl)){
			tpl = [];
			tpl.push('  <% for ( var i = 0; i < icons.length; i++ ) { %>');
			tpl.push('	<a class="social-share-button" href="#share/<%=icons[i].name%>" target="_blank">');
			tpl.push(' 		<div class="social-icon social-icon-<%=icons[i].name%>"></div>');
			tpl.push('	</a>');
			tpl.push('  <% } %>');
			tpl = tpl.join("\n");
		}
		container.innerHTML = tmpl(tpl, templateData);
		return container;
	};

	var initSocialNetworkList = function() {
		window.socialIcons.networks = [];
		for (i = 0; i < window.socialIcons.list.length; i++) {
			var icon = window.socialIcons.list[i];
			window.socialIcons.networks.push(icon.name);
		}
	};

	var configureLink = function(link, setup) {
	    var url = setup.url;
	    var pattern = /\{\{([^}]+)\}\}/g;
	    var match;
	    while ((match = pattern.exec(setup.url)) !== null) {
	        var parmName = match[1];
	        var parmValue = window.socialIcons.setup[parmName];
	        if (typeof parmValue === "function"){
	        	parmValue = parmValue();
	        }
	        if (!parmValue) {
	            parmValue = "";
	        }
	        url = url.replace("{{" + parmName + "}}", encodeURIComponent(parmValue));
	    }
	    link.href = url;
	};

	function processLinks(container) {
	    var elems = container.getElementsByTagName("a");
	    for (i = 0; i < elems.length; i++) {
	        var btn = elems[i];
	        var brandName = btn.href.split("#")[1].split("/")[1];
	        var cfg = getIconSetup(brandName);
	        if (cfg.url) {
	            if (brandName === "github") {
	                if (!window.socialIcons.setup.githubUrl) {
	                    console.error("no valid window.socialIcons.setup.githubUrl found", cfg);
	                }
	                btn.href = window.socialIcons.setup.githubUrl;
	            } else {
	                configureLink(btn, cfg);
	            }
	        } else {
	            console.error("no valid share url found", cfg);
	        }
	    }
	}

	initSocialNetworkList();

	window.addEventListener("load", function load(){
		var container = renderTemplateData();
    	processLinks(container);
	});

	// default configuration
	if (!window.socialIcons.setup){
		window.socialIcons.setup = {
			title 	: document.title,
			url 	: location.href,
			subject : "Look at this my friend",
			body 	: function(){
				return "Take a look at this website. It is awesome! " + window.socialIcons.setup.url;
			}
		};
	}

})();