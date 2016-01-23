#!/usr/bin/env node
var electron = require('electron-prebuilt')
var proc = require('child_process')
var path = require('path')


var args = [ path.join(__dirname, "..", "app") ];
for (var i = 2; i < process.argv.length; i++) {
	var arg = process.argv[i];
	args.push(arg);
}

/*
	var lingeringLine = "";

	process.stdin.on('data', function(chunk) {
		console.log("data", chunk);
	    lingeringLine += chunk;
	});

	process.stdin.on('end', function() {
	    console.log("-", lingeringLine);
	});

*/
// spawn electron
var _process = proc.spawn(electron, args/*, {
    stdio: [ process.stdin, process.stdout, process.stderr],
 	cwd: process.cwd,
  	env: process.env
}*/);

_process.on('close', function (code) {
	process.exit(code);
});