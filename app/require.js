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
		console.groupCollapsed("ironNode require(\"" + name + "\")");
		try{
			var fn = path.basename(name);
			var fn2 = (path.isAbsolute(name) ? name : this.filename);
			var p = path.join(fn2, "..");

			/*jump back to nearest node_modules*/
			var nodeModulesLevel = checkNodeModulesLevel(fn2);
			if (nodeModulesLevel === -1){
				throw "native+ fallback for `" + name + "` failed! You can try `iron-node --compile`";
			}
			for (var lvl = 0; lvl < nodeModulesLevel-1; lvl++) {
				p = path.join(p, "..");
			}
			p = path.join(p, "bin", nmp.versionString(), fn);

			console.warn("try native+ method `require(" + p + ");`");
			result = _require.call(this, p);
		} catch(e) {
			console.error("error while `require(" + path.basename(name) + ");`", e);
    		result = _require.call(this, name);
		} finally {
			if (result !== null){
				console.info("success");
			}
			console.groupEnd();
		}
	} else {
    	result = _require.call(this, name);
	}
	return result;
};
