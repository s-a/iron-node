#!/usr/bin/env node
var electron = require('electron-prebuilt');
var proc = require('child_process');
var fs = require('fs');
var path = require('path');


var args = [ path.join(__dirname, "..", "app") ];
for (var i = 2; i < process.argv.length; i++) {
	var arg = process.argv[i];
	args.push(arg);
}


var onStdIn = function(done) {
	if( process.stdin.isTTY === true ){
		done();
	}

	var body = "";
	process.stdin.on('data', function(chunk) {
		if (chunk){
	    	body += chunk.toString();
		}
	});

	process.stdin.on('end', function() {
	    done(body);
	});
};


onStdIn(function(stdin){
	if (stdin){
		var temporaryFilename = path.join(__dirname, "iron-node.piped-result.~mp.js");
		fs.writeFileSync(temporaryFilename, stdin);
		args[1] = temporaryFilename;
	}


	fs.writeFileSync(path.join(__dirname, "iron-node.env.json"), JSON.stringify(process.env, null, 4));

	// spawn electron
	var _proc = proc.spawn(electron, args);

  	_proc.on('close', function (code) {
	    process.exit(code);
	});
});