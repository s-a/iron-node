#!/usr/bin/env node
var electron = require('electron-prebuilt')
var proc = require('child_process')
var path = require('path')


var args = [ path.join(__dirname, "..", "app") ];
for (var i = 2; i < process.argv.length; i++) {
	var arg = process.argv[i];
	args.push(path.resolve(process.cwd(), arg));
}


// spawn electron
var child = proc.spawn(electron, args);
