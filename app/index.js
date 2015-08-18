var app = require('app');  // Module to control application life.
var ipc = require('ipc');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Toaster = require('electron-toaster');  // Module to create native browser window.
var toaster = new Toaster();
// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;



app.on('window-all-closed', function() {
	if (process.platform !== 'darwin'){
		app.quit();
	}
});





var initializeV8 = function(config) {
	if (config.v8 && config.v8.flags){
		for (var i = 0; i < config.v8.flags.length; i++) {
			var flag = config.v8.flags[i];
			console.log("v8", flag);
			app.commandLine.appendSwitch("js-flags", flag)
		}
	}
}

var initializeApplication = function() {
	var config = new require("./config.js")(process.argv);
	//var config = getConfiguration();
	if (config){
		console.log("configuration", config.filename);
		initializeV8(config.settings);
	}
	//app.commandLine.appendSwitch('remote-debugging-port', '9222')
}

app.on('ready', function() {

	var firstStart = true;
	ipc.on('is-iron-node-first-start', function(event/*, arg*/) {
		event.sender.send("is-iron-node-first-start-asynchronous-reply", {firstStart:firstStart});
		firstStart = false;
	});

	initializeApplication();

	var meta = require("./../package.json");
	var program = require('commander');

	program.version(meta.version).allowUnknownOption()
  	.option('-c, --compile [value]', 'recompile native modules for current electron version and processor architecture')
	.parse(process.argv);


	if (program.compile){
		var recompiler = require("./../node_modules/electron-recompile/lib/recompiler.js");
		var targetFolder = program.compile;
		if (targetFolder.toString().toLowerCase() === "true"){
			targetFolder = process.cwd();
		}
		recompiler.run({
			dir : targetFolder,
			electronVersion : process.versions.electron,
			arch : process.arch
		});

		app.quit();
		process.exit(0);
	} else {
		mainWindow = new BrowserWindow({
			width: 800,
			height: 600,
			title : "ironNode v" + meta.version,
			icon: __dirname + '/icon.png',
			transparent: false,
			frame: true,
			'web-preferences' : {
				'experimental-features' : true
			}
		});

		toaster.init(mainWindow);

		mainWindow.maximize();
		mainWindow.openDevTools();

		mainWindow.on('closed', function() {
			mainWindow = null;
		});

		mainWindow.on('devtools-opened', function() {
			mainWindow.loadUrl('file://' + __dirname + '/index.html');
		});
	}
});


