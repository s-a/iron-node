const {dialog} = require('electron');
var execute = function(cmd, done) {
	var exec = require('child_process').exec;
	exec(cmd,
		function (error, stdout, stderr) {
			console.log("CMD:", cmd);
			console.log(stdout);
			console.log(stderr);
			if (error === null) {
				done(stdout);
			} else {
				console.log('exec error: ' + error);
				throw error;
			}
	});
}

var Update = function () {
	return this;
}

Update.prototype.check = function(window) {
	dialog.showMessageBox(window, {type:"info", title:"ironNode Update check", message:"Stay tuned. This may take a few seconds.", detail:"", buttons: ["ok"]});
	execute("npm outdated -g --depth=0 iron-node", function(str){
		dialog.showMessageBox(window, {type:"info", title:"ironNode Update check done", message:str, detail:"", buttons: ["ok"]});
	});
};

module.exports = Update;