var os = require('os');
var remote = require('electron');
const {Menu} = remote;
var template = [];
var SoftwareUpdate = require('./update.js');
const {app} = require('electron');
var path = require("path");
var fs = require("fs");
var shell = require('electron').shell;

var Mnu = function() {
	return this;
};

Mnu.prototype.init = function(mainWindow) {
	var mnuFile = {
		label: 'Project',
		submenu: [
			{
				label: 'Exit',
				click: function() {
					mainWindow.close();
				},
				accelerator: 'Control+w'
			}
		]
	};

  if (os.platform() === 'darwin') {
    mnuFile.submenu.push({
      type: 'separator'
    });
    mnuFile.submenu.push({
      label: 'Quit ironNode',
      click: function () {
        app.quit();
      },
      accelerator: 'Cmd+Q'
    });
  }
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
					mainWindow.openDevTools();
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
					shell.openExternal("https://developer.chrome.com/devtools/docs/javascript-debugging");
				}
			},
			{
				label: 'Report a bug',
				click: function() {
					shell.openExternal("https://github.com/s-a/iron-node/issues");
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Source Code',
				click: function() {
					shell.openExternal("https://github.com/s-a/iron-node");
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Check for Updates',
				click: function() {
					var upd = new SoftwareUpdate();
					upd.check(mainWindow);
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Donate',
				click: function() {
					shell.openExternal("http://s-a.github.io/donate/");
				}
			}
		]
	};
	template.push(mnuHelp);

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};

module.exports = Mnu;
