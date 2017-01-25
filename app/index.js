const {app} = require("electron");
var path = require("path");  // Module to control application life.
const {BrowserWindow} = require("electron");
var Mnu = require(path.join(__dirname, "menu.js"));
var fs = require("fs");

 
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

app.on("window-all-closed", function() {
	var fn = process.argv[2];
	if (fn){
		if(fn.indexOf(".~mp.js") !== -1 && fs.existsSync(fn)){
			fs.unlinkSync(fn);
		}
	}
	if (process.platform !== "darwin"){
		app.quit();
	}
});

var initializeV8 = function(config) {
	if (config.v8 && config.v8.flags){
		for (var i = 0; i < config.v8.flags.length; i++) {
			var flag = config.v8.flags[i];
			console.log("v8", flag);
			app.commandLine.appendSwitch("js-flags", flag);
		}
	}
};

var initializeApplication = function() {
	var CFG = require("./config.js");
	var config = new CFG(process.argv);
	//var config = getConfiguration();
	if (config){
		console.log("configuration", config.filename);
		initializeV8(config.settings);
	}
	//app.commandLine.appendSwitch('remote-debugging-port', '9222')

	return config;
};

app.on("ready", function() {
	var config = initializeApplication();

	var meta = require("./../package.json");
	var program = require("commander");

	program.version(meta.version).allowUnknownOption()
	.option("-c, --compile [value]", "recompile native modules for current electron version and processor architecture")
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
			width: 1,
			height: 1,
			title : "ironNode v" + meta.version,
			icon: path.join(__dirname, "icon.png"),
			transparent: false,
			frame: true,
			webPreferences : {
				experimentalFeatures : true
			}, 
			images :false
		});



		var menu = new Mnu();
		menu.init(mainWindow);

		
		if (config.settings.app.hideMainWindow){
			mainWindow.hide();
		} else {
			mainWindow.maximize();
		}

		mainWindow.webContents.on("closed", function() {
			mainWindow = null;
		});

		mainWindow.webContents.on("devtools-closed", function() {
			if (config.settings.app.hideMainWindow){
				setTimeout(function(){
					if (mainWindow){
						// app.quit crashes maybe until https://github.com/electron/electron/issues/6359
						var windows = BrowserWindow.getAllWindows();
						for(var i = 0 ; i < windows.length; i++){
							var w = windows[i];
							w.destroy();
						}
					}
				}, 200);
			}
		});

 
		let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty("ironNodeDevTools");
		BrowserWindow.removeDevToolsExtension("ironNodeDevTools");
 
		if (config.settings.app.useIronNodeDevToolsExtension && !installed){
			BrowserWindow.addDevToolsExtension(path.join(__dirname, "devtools-extension"));
		} else {
			if (installed){ 
				BrowserWindow.removeDevToolsExtension("ironNodeDevTools");
			}
		} 

 


		mainWindow.webContents.on("devtools-opened", function() {
			setTimeout(function(){
				mainWindow.loadURL("file://" + __dirname + "/index.html"); 
			}, 200);
		});


		mainWindow.openDevTools({detach : config.settings.app.openDevToolsDetached});
	}
});