var remote = require('remote');
var Menu = remote.require('menu');
var template = [];


var mnuFile = {
	label: 'Project',
	submenu: [
		{
			label: 'Exit',
			click: function() {
				remote.getCurrentWindow().close();
			},
			accelerator: 'Alt+F4'
		}
	]
};
template.push(mnuFile);

var mnuView =   {
	label: 'View',
	submenu: [
		{
			label: 'Debugger',
			click: function() {
				remote.getCurrentWindow().openDevTools();
			},
			accelerator: 'F12'
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