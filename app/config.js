var fs = require("fs");
var path = require("path");
var app; 


try{
	app = require("app");
} catch(e){
	app = require("remote").require("app");
}

var Config = function(argv) {
	var result = {
		filename : null,
		settings : {v8:{}, app:{}}
	};

	var dir = "";

	if (argv[2]){
		dir = argv[2];
	}
	var configFilename = path.join(path.resolve(path.dirname(dir)), ".iron-node.js");
	if (!fs.existsSync(configFilename)){
		configFilename = path.join(process.cwd(), path.resolve(path.dirname(dir)), ".iron-node.js");
	}
	if (!fs.existsSync(configFilename)){
		configFilename = path.join( app.getPath("appData"), "iron-node", ".iron-node.js");
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

	return result;
};

module.exports = Config;