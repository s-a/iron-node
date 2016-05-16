var os = require('os');
var fs = require('fs');
var path = require('path');
var remote = require('electron').remote;
var markdown = require('markdown').markdown;
var packageController = require("package.js");
var app = require('electron').remote.app
var shell = require('electron').shell;
var PrettyError = require('pretty-error');
var prettyError = new PrettyError();
var deepExtend = require('deep-extend');
var s = "file:///" + path.join(__dirname, "app.js").replace(/\\/g, "/");
prettyError.skipPath( s );
prettyError.withoutColors();
prettyError.skipNodeFiles();
var syntaxErrorCheck = require('syntax-error')

window.socialIcons.setup.githubUrl = "https://github.com/s-a/iron-node/";
window.socialIcons.setup.media = "https://raw.githubusercontent.com/s-a/iron-node/master/screenshot.jpg";
window.socialIcons.setup.url = "http://s-a.github.io/iron-node/";
window.socialIcons.setup.title = "Dead simple Node.js code debugging";


var onLinkClick = function(event) {
    event.preventDefault();
    if (this.href.indexOf("git+") === 0){
    	shell.openExternal(this.href.split("git+")[1]);
    } else {
    	shell.openExternal(this.href);
    }
    return false;
};

window.addEventListener('load',function(){
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		link.onclick = onLinkClick;
	}
},false); //W3C




var notify = function (msg) {
	var notification = null;
	try{
		Notification.requestPermission();
		notification = new Notification(msg.title, { body: msg.text, icon: '../logo/icon.png' });
	} catch(e){
		console.error(e, notification);
	}
}

var error = function(error) {


  	console.error(prettyError.render(error));
  	console.error("Details", error);

	var msg = {
		title : "",
		text : ""
	};

	switch (typeof error) {
		case "object":
			msg.title += "Uncaught Exception: " + (error.code || "");
			msg.text += error.message;
			break;
		case "string":
			msg.text += error;
			break;
	}
	msg.text += "\nPlease check the console log for more details.";
	notify(msg);
}

process.on('uncaughtException', error);
process.exit = function(code) {
	var msg = {
		title : "process.exit",
		text : ""
	}

	msg.text += "Exit Code: \"" + code + "\"";

	if (code !== 0){
		msg.text += "ERROR : Please check the console log for more details.";
	}

	notify(msg);
}

var prepareStartScriptParameter = function(filename) {
	var result = filename;

	if (!path.isAbsolute(filename)){
		result = path.resolve(process.cwd(), filename);
	}

	return result;
};

var initializePackageScripts = function(json) {
	var packageMeta = json;
	var scripts = [];
	if (packageMeta.scripts){
		for(var script in packageMeta.scripts){
			if (packageMeta.scripts.hasOwnProperty(script)){
				scripts.push('<a class="menu-item" href="#"><span class="octicon octicon-terminal"></span>' + script + ' : ' + packageMeta.scripts[script] + '</a>');
			}
		}
	}
	document.getElementById("project-terminal").innerHTML = scripts.join("");
}

var initializePackageInfo = function(rootDirectory){
	var p = path.join(rootDirectory, "package.json");
	fs.exists(p, function(exists){
		if (exists){
			fs.readFile(p, function(err, data){
				if (err){
					console.error(err);
				} else {
					try{
						document.getElementById("project-package").innerHTML = '<a class="menu-item" href="#"><span class="octicon octicon-package"></span><span>' + p + '</span></a>';
						var meta = JSON.parse(data.toString());
						initializePackageScripts(meta);
						if (meta.repository && meta.repository.url){
							document.getElementById("project-repo-url").innerHTML = '<a class="menu-item" href="' + meta.repository.url + '"><span class="octicon octicon-repo"></span>Repository</a>';
						}
						if (meta.bugs && meta.bugs.url){
							document.getElementById("project-bugs-url").innerHTML = '<a class="menu-item" href="' + meta.bugs.url + '"><span class="octicon octicon-bug"></span>Issues</a>';
						}
					} catch (e){
						console.error("Error in", p, e);
					}
				}
			});
		}
	});
}

var initializeInfoWindow = function(rootDirectory, startupScript) {
	document.getElementById("project-filename").innerHTML = startupScript;

	initializePackageInfo(rootDirectory);
	var filename = path.join(rootDirectory, "DEBUG.md");
	var loadMarkdownFile = function(fn) {
		fs.readFile(fn, function(err, data){
			document.getElementById("content").innerHTML =  markdown.toHTML( data.toString() );
			var links = document.getElementsByTagName("a");
			for (var i = 0; i < links.length; i++) {
				var link = links[i];
				link.onclick = onLinkClick;
			}
		});
	};

	fs.exists(filename, function(exists){
		if (exists){
			loadMarkdownFile(filename);
		} else {
			filename = path.join(rootDirectory, "README.md");
			fs.exists(filename, function(exists){
				if (exists){
					loadMarkdownFile(filename);
				}
			});
		}
	});
};

var extendProcessEnvironment = function () {
	var envFilename = path.join(__dirname, "..", "bin", "iron-node.env.json");
	if (fs.existsSync(envFilename)){
		var env = require(envFilename);
		process.env = deepExtend(env, process.env);
		if (env.NODE_PATH){
			module.paths.push(env.NODE_PATH);
		}
	}
};

var boot = function() {
	process.stdout.write = console.log.bind(console);

	var customPackageFolder = path.join( app.getPath("appData"), "iron-node", "node_modules" );
	if (!fs.existsSync(customPackageFolder)){
		customPackageFolder = path.join(__dirname, "..", "node_modules");
	}

	console.groupCollapsed("ironNode boot");
	console.log("os", os.platform(), os.type());
	console.log("versions", process.versions);
	console.log("appData", customPackageFolder );


	var config = new require("./config.js")(remote.process.argv);
	console.log("configuration", config);
	if (config && config.settings && config.settings.app && config.settings.app["native+"] === true){
		require("./require.js");
	}

	if (fs.existsSync(customPackageFolder)){
		console.groupCollapsed("ironNode packages");
		packageController.autoload({
			debug: true,
			identify: function() {
				return (this.meta.iron_node_package === true);
			},
			directories: [customPackageFolder],
			packageContstructorSettings: {}
		});
		console.groupEnd();
	} else {
		console.warn("No packages folder found. You can install some at " +  path.join( app.getPath("appData"), "iron-node", "node_modules" ) + " from ", "https://www.npmjs.com/search?q=iron-node", ":O)");
	}

	console.groupEnd();

	var args = remote.process.argv;
	if (args[2]){
		args[2] = prepareStartScriptParameter(args[2]);
	}

	// reset and equip process.argv for forthcoming Node.js scripts.
	process.argv = [args[0]];
	for (var i = 2; i < args.length; i++) {
		var arg = args[i];
		process.argv.push(arg);
	}

	if (args[2]){
		var webContents = remote.getCurrentWindow().webContents;
		var workSpaceDirectory = config.settings.workSpaceDirectory(args);
		if (!Array.isArray(workSpaceDirectory)){
			workSpaceDirectory = [workSpaceDirectory];
		}
		if (config.settings.app.autoAddWorkSpace !== false){
			for (var w = 0; w < workSpaceDirectory.length; w++) {
				var wsd = workSpaceDirectory[w];
				try {
					webContents.removeWorkSpace( wsd );
				} catch(e){}
				webContents.addWorkSpace( wsd );
			}
		}
		initializeInfoWindow(workSpaceDirectory[0], args[2]);

		var src = fs.readFileSync(args[2]);
		var err = syntaxErrorCheck(src, args[2]);
		if (err){
			console.warn("Error compiling ", args[2], "...");
		  	console.error(prettyError.render(new Error(err)));
			console.warn("Try to go on...");
		}

		extendProcessEnvironment();

		/* jshint ignore:start */
		var Req = require(path.join(__dirname, "require-custom-wrap.js"));
		var req = new Req(config.settings);
		/* jshint ignore:end */

		require(args[2]);
	} else {
		document.getElementById("project-filename").innerHTML = "No start script given.<br>Try <code>iron-node [path_to_your_javascript_file]</code>";
		initializeInfoWindow(process.cwd());
	}
}

boot();