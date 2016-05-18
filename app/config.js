var fs = require("fs");
var path = require("path");
var deepExtend = require('deep-extend');


var linuxHome = function () {
	return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};

var osxHome = function () {
	return path.join(process.env.HOME, "Library/Preferences");
};

var home = function () {
	return process.env.APPDATA || (process.platform === "darwin" ? osxHome() : linuxHome());
};


var Config = function(argv) {
	var workSpaceDirectory = "";
	var startupScriptName = "";

	var dir = "";
	if (argv[2]){
		dir = argv[2];
		workSpaceDirectory = path.dirname(argv[2]);
		startupScriptName = path.basename(argv[2]).toLowerCase();
	}
	// the only build in default
	switch(startupScriptName) {
	    case "_mocha":
	        workSpaceDirectory = process.cwd();
	        break;
	}

	var defaults = {
		filename : null,
		settings : {
			v8:{},
			app:{},
			workSpaceDirectory : function() {
				var p = path.resolve(workSpaceDirectory);
				return p;
			}
		}
	};
	var result = {};

	var configFilename = path.join(path.resolve(path.dirname(dir)), ".iron-node.js"); // full pathname
	if (!fs.existsSync(configFilename)){
		configFilename = path.join(process.cwd(), path.resolve(path.dirname(dir)), ".iron-node.js"); // relative pathname
	}
	try{
		configFilename = path.normalize(configFilename);
		if (!fs.existsSync(configFilename)){
			configFilename = path.join( process.cwd(), ".iron-node.js"); // current working dir pathname
		}
	} catch (e){
		configFilename = path.join( process.cwd(), ".iron-node.js"); // current working dir pathname
	}
	if (!fs.existsSync(configFilename)){
		configFilename = path.join( home(), "iron-node", ".iron-node.js"); // global config pathname
	}
	if (fs.existsSync(configFilename)){
		try{
			result = {
				filename : configFilename,
				settings : require(configFilename)
			};
		} catch(e){
			console.error(e);
		}
	}


	var cfg = deepExtend(defaults, result);
	return cfg;
};

module.exports = Config;