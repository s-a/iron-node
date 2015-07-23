var remote = require('remote');
var dialog = remote.require('dialog');
var semver = require('semver');


var execute = function(cmd, done) {
	var exec = require('child_process').exec;
	exec(cmd,
		function (error, stdout, stderr) {
			console.log("CMD:", cmd);
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
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

Update.prototype.check = function() {
	execute("npm show -g iron-node version", function(remoteVersion){
		var latestVersion = remoteVersion.replace(/\r?\n|\r/g, "").trim();
		execute("npm list -g --depth=0 iron-node", function(localVersion){
			var currentVersion = localVersion.split("@")[1].replace(/\r?\n|\r/g, "").trim();
			var details = "Latest version: " + latestVersion+ "\n";
			details += "Current version: " + currentVersion;
			currentVersion = semver.clean(currentVersion);
			latestVersion = semver.clean(latestVersion);
			if (semver.lt(currentVersion, latestVersion)) {
				dialog.showMessageBox(remote.getCurrentWindow(), {type:"warning", title:"ironNode Update", message:"A new update is available!\nTo install it close this program.\nOpen a console and type:\n`npm install -g iron-node`.", detail:details, buttons: ["ok"]});
			} else {
				dialog.showMessageBox(remote.getCurrentWindow(), {type:"info", title:"ironNode Update", message:"Everything is up-to-date!", detail:details, buttons: ["ok"]});
			}
		});
	});
};

module.exports = Update;