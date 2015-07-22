var fs = require('fs');
var path = require('path');
var remote = require('remote');
var dialog = remote.require('dialog');
var markdown = require('markdown').markdown;
// TODO: change logic to remote.process.argv
var commandLineArguments = null;


window.opener = window.open = require("open");


var error = function(error) {
	dialog.showMessageBox(remote.getCurrentWindow(), {type : "error", title:"Uncaught Exception: " + error.code, message:error.message, detail:error.stack, buttons:["ok", "close"]}, function(response){
		if (response === 1){
			remote.getCurrentWindow().close();
		}
	});
}

var prepareStartScriptParameter = function(filename) {
	var result = filename;

	if (!path.isAbsolute(filename)){
		result = path.resolve(process.cwd(), filename);
	}

	return result;
};

var initializeInfoWindow = function(rootDirectory) {
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
	var args = JSON.parse(process.env.commandLineArguments || remote.getCurrentWindow().commandLineArguments);

	for (var i = 2; i < args.length; i++) {
		var arg = args[i];
		process.argv.push(arg);
	}

	if (args[2]){
		args[2] = prepareStartScriptParameter(args[2]);
	}

	commandLineArguments = args;

	if (args[2]){
		document.getElementById("project-filename").innerHTML = args[2];
		initializeInfoWindow(path.dirname(args[2]));
		require(args[2]);
	} else {
		document.getElementById("project-filename").innerHTML = "No start script given.<br>Try <code>iron-node [path_to_your_javascript_file]</code>";
		initializeInfoWindow(process.cwd());
	}
}

process.on('uncaughtException', error);

window.onload = function() {
  window.setTimeout(boot, 1000);
}