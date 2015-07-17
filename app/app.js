
var boot = function() {
  var args = JSON.parse(process.env.commandLineArguments);
  console.log(args);

  for (var i = 2; i < args.length; i++) {
    var arg = args[i];
    process.argv.push(arg);
  }

  require(args[2]);
}

window.onload = function() {
  window.setTimeout(boot, 1000);
}