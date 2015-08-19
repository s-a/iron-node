var os = require('os');
var fs = require('fs');
var path = require('path');
var remote = require('remote');
var ipc = require('ipc');
var markdown = require('markdown').markdown;
var packageController = require("package.js");
/*var events = require('events');*/
var app = remote.require("app");

/*var CustomApp = function  () {
	this.events = new events.EventEmitter();
	return this;
};*/

window.opener = window.open = require("open");

var error = function(error) {
	console.error(error);
	var msg = {
		/*type : "error",
		title : "Uncaught Exception",
		buttons:["ok", "close"],*/
		width : 400
	};

	switch (typeof error) {
		case "object":
			msg.title = "Uncaught Exception: " + error.code;
			msg.message = error.message;
			break;
		case "string":
			msg.message = error;
			break;
	}
	msg.detail = "Please check the console log for more details.";

	ipc.send('electron-toaster-message', msg);
}

process.on('uncaughtException', error);
process.exit = function(code) {
	var msg = {
		title : "process.exit",
		width : 300
	}

	msg.message = "Exit Code: \"" + code + "\"";

	if (code !== 0){
		msg.detail = "ERROR : Please check the console log for more details.";
	}

	ipc.send('electron-toaster-message', msg);	
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
							document.getElementById("project-repo-url").innerHTML = '<a class="menu-item" href="#" onclick="window.opener(\'' + meta.repository.url + '\')"><span class="octicon octicon-repo"></span>Repository</a>';
						}
						if (meta.bugs && meta.bugs.url){
							document.getElementById("project-bugs-url").innerHTML = '<a class="menu-item" href="#" onclick="window.opener(\'' + meta.bugs.url + '\')"><span class="octicon octicon-bug"></span>Issues</a>';
						}
					} catch (e){
						console.error("Error in", p, e);
					}
				}
			});
		}
	});
}

var initializeInfoWindow = function(rootDirectory) {
	initializePackageInfo(rootDirectory);
	var filename = path.join(rootDirectory, "DEBUG.md");
	var loadMarkdownFile = function(fn) {
		fs.readFile(fn, function(err, data){
			document.getElementById("content").innerHTML =  markdown.toHTML( data.toString() );
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

 


var boot = function() {
	var customPackageFolder = path.join( app.getPath("appData"), "iron-node", "node_modules" );
	if (!fs.existsSync(customPackageFolder)){
		customPackageFolder = path.join(__dirname, "..", "node_modules");
	}

	console.groupCollapsed("ironNode boot");
	//console.log("%cUser %s has %d points", "color:cyan; font-size: 110%", 1, 2);
	console.log("os", os.platform(), os.type());
	console.log("versions", process.versions);
	console.log("appData", customPackageFolder );


	var config = new require("./config.js")(remote.process.argv);
	console.log("configuration", config);
	if (config && config.settings && config.settings.app && config.settings.app["native+"] === true){
		require("./require.js");
	}


	console.groupCollapsed("ironNode packages");
	//var customApp = new CustomApp();
	packageController.autoload({
		debug: true,
		identify: function() {
			return (this.meta.iron_node_package === true);
		},
		directories: [customPackageFolder],
		packageContstructorSettings: {/*app:customApp*/}
	});
	console.groupEnd();

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
		document.getElementById("project-filename").innerHTML = args[2];
		initializeInfoWindow(path.dirname(args[2]));

		if (config.settings.app.autoAddWorkSpace !== false){
			ipc.on('is-iron-node-first-start-asynchronous-reply', function(reply) {
				if (reply.firstStart){
					remote.getCurrentWindow().webContents.addWorkSpace( path.dirname(args[2]) );
				}
				require(args[2]);
			});
			ipc.send("is-iron-node-first-start");
		}
	} else {
		document.getElementById("project-filename").innerHTML = "No start script given.<br>Try <code>iron-node [path_to_your_javascript_file]</code>";
		initializeInfoWindow(process.cwd());
	}

}

boot();