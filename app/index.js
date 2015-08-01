var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

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

app.on('ready', function() {

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
			'icon': __dirname + '/icon.png',
			transparent: false,
			frame: true
		});

		mainWindow.loadUrl('file://' + __dirname + '/index.html');

		mainWindow.maximize();
		mainWindow.openDevTools();

		mainWindow.on('closed', function() {
			mainWindow = null;
		});
	}
});