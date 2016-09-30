var settings;
var Module = require("module");


var isArray = function(ar) {
  return ar instanceof Array || Array.isArray(ar) || (ar && ar !== Object.prototype && isArray(ar.__proto__));
};

var newModuleWrap = function(script) {
	var nodeParms = ["exports", "require", "module", "__filename", "__dirname", "process", "global"];
	if (settings.nodeModule.arguments && isArray(settings.nodeModule.arguments)){
		for (var i = 0; i < settings.nodeModule.arguments.length; i++) {
			var parm = settings.nodeModule.arguments[i];
			nodeParms.push(parm);
		}
	}

	var w = [];
	w.push("(function (" + nodeParms.join(", ") + ") { \n");

	if(settings.nodeModule && settings.nodeModule.scriptInjection){
		script = settings.nodeModule.scriptInjection  + "\n" + script;
	}

	w.push("\n});");

	return w[0] + script + w[1];
};

var ModedModule = function (ironNodeSettings) {
	settings = ironNodeSettings;
	console.log(settings);
	if (ironNodeSettings && ironNodeSettings.nodeModule){
		(function(moduleWrapMethode) {
			Module.wrap = function(script) {
				return moduleWrapMethode(script); // Call the new wrapper function
			};
		}(newModuleWrap)); // Pass original function to IIFE
	}
};

module.exports = ModedModule;