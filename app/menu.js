var os = require('os');
var remote = require('remote');
var Menu = remote.require('menu');
var template = [];
var SoftwareUpdate = require('./update.js');
var app = remote.require("app");
var path = remote.require("path");
var fs = remote.require("fs");

var mnuFile = {
	label: 'Project',
	submenu: [
		{
			label: 'Exit',
			click: function() {
				app.exit(0);
			},
			accelerator: 'Control+w'
		}
	]
};
template.push(mnuFile);

if (os.platform() === 'darwin'){
	var mnuEdit = {
		label : 'Edit',
		submenu:[
			{
				label: 'Cut',
				accelerator: 'Cmd+X',
				selector: 'cut:'
			},
			{
				label: 'Copy',
				accelerator: 'Cmd+C',
				selector: 'copy:'
			},
			{
				label: 'Paste',
				accelerator: 'Cmd+V',
				selector: 'paste:'
			},
			{
				label: 'Select All',
				accelerator: 'Cmd+A',
				selector: 'selectAll:'
			}
		]
	};

	template.push(mnuEdit);
}

var mnuView =   {
	label: 'View',
	submenu: [
		{
			label: 'Show developer tools',
			click: function() {
				remote.getCurrentWindow().openDevTools();
			},
			accelerator: 'F12'
		},
		{
			label: 'Show global config folder',
			click: function() {
				var shell = require('electron').shell;
				var f = path.join(app.getPath("appData"), "iron-node");
				if (!fs.existsSync(f)){
					console.warn("No packages folder found. You can install some at " +  path.join( app.getPath("appData"), "iron-node", "node_modules" ) + " from ", "https://www.npmjs.com/search?q=iron-node", ":O)");
				}
				shell.openItem( f );
			} 
		}
	]
};
template.push(mnuView);

var mnuHelp =   {
	label: 'Help',
	submenu: [
		{
			label: 'Documentation',
			click: function() {
				open("https://developer.chrome.com/devtools/docs/javascript-debugging");
			}
		},
		{
			label: 'Report a bug',
			click: function() {
				open("https://github.com/s-a/iron-node/issues");
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Source Code',
			click: function() {
				open("https://github.com/s-a/iron-node");
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Update',
			click: function() {
				var upd = new SoftwareUpdate();
				upd.check();
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Donate',
			click: function() {
				open("http://s-a.github.io/donate/");
			}
		}
	]
};
template.push(mnuHelp);

var menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);