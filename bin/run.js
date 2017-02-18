#!/usr/bin/env node
var electron = require("electron");
var proc = require("child_process");
var fs = require("fs");
var os = require('os');
var path = require("path");

var sep 		= path.sep;
var userHome 	= os.homedir() + sep + '.iron-node';
function mkDirOnce (dirPath) {
	console.log('userhome ' + dirPath)
	try {
		fs.statSync(dirPath);
		console.log('exist')
	} catch(e) {
		try {
			fs.mkdirSync(dirPath);
			console.log('created')
		}catch(error){
			console.log('error:' + error);
		}
	}
}
mkDirOnce(userHome);

var args = [path.join(__dirname, "..", "app")];
for (var i = 2; i < process.argv.length; i++) {
	var arg = process.argv[i];
	args.push(arg);
}


var onStdIn = function(done) {
	if( process.stdin.isTTY === true ){
		done();
	}

	var body = "";
	process.stdin.on("data", function(chunk) {
		if (chunk){
			body += chunk.toString();
		}
	});

	process.stdin.on("end", function() {
		done(body);
	});
};

onStdIn(function(stdin){
	if (stdin){
		var temporaryFilename = path.join(__dirname, "iron-node.piped-result.~mp.js");
		fs.writeFileSync(temporaryFilename, stdin);
		args[1] = temporaryFilename;
	}

	fs.writeFileSync(path.join(userHome, "iron-node.env.json"), JSON.stringify(process.env, null, 4));

	// spawn electron
	var _proc = proc.spawn(electron, args);

	_proc.on("close", function (code) {
		process.exit(code);
	});
});