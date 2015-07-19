var remote = require('remote');
var commandLineArguments = null;

var boot = function() {
  var args = JSON.parse(process.env.commandLineArguments);
  console.log(args);

  for (var i = 2; i < args.length; i++) {
    var arg = args[i];
    process.argv.push(arg);
  }

  commandLineArguments = args;
  require(args[2]);
}

window.onload = function() {
  window.setTimeout(boot, 1000);
}

process.on('uncaughtException', function(err) {
	alert("uncaughtException:\n" + commandLineArguments[2] + "\n" + err);
	remote.getCurrentWindow().close();
});