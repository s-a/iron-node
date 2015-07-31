//var fs = require("fs");
var fs = require("fs");
var path = require("path");
var NMP = require("nmp");
var nmp = new NMP();
var Module = require('module');

// keep a copy of original require function
var _require = Module.prototype.require;


var checkNodeModulesLevel = function(dir) {
	var result = -1;
	var p = dir;

	while( path.basename(p) !== "node_modules" ){
		// can it go back?
		var newPath = path.join(p, "..")
		if (newPath !== p){
			p = newPath;
			result++;
		} else {
			break;
		}
	}

	return result;

};

Module.prototype.require = function require(name) {
	var result = null;

	// test if native module should be loaded.
	if (path.extname(name).toLowerCase() === ".node" || fs.existsSync(name + ".node")){
		try{
    		result = _require.call(this, name);
		} catch(e) {
			console.error("error while `require(" + name + ");`", e);
			console.info("try native+ fallback `require(" + name + ");`");
			var nodeModulesLevel = checkNodeModulesLevel(this.filename);
			if (nodeModulesLevel === -1){
				throw "native+ fallback for `" + name + "` failed! You can try `iron-node --compile`";
			} else {
				var fn = path.basename(name);
				var p = path.join(this.filename, "..");
				for (var lvl = 0; lvl < nodeModulesLevel-1; lvl++) {
					p = path.join(p, "..");
				}
				p = path.join(p, "bin", nmp.versionString(), fn);

				result = _require.call(this, p);
			}
		}
	} else {
    	result = _require.call(this, name);
	}
	return result;
};
