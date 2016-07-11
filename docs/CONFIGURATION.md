# Local and global configuration

Since v1.5.20 ironNode supports local and global configuration via a configuration setup file.
A configuration is saved in a file called [.iron-node.js](/.iron-node.js).  
ironNode scans the directory of the given JavaScript file first (local). If not found the next try is in ironNode' s ```AppData``` folder (global).  

## v8 flags
You can setup the [v8-flags](https://github.com/thlorenz/v8-flags/blob/master/flags-0.11.md) at the ```v8``` section in [.iron-node.js](/.iron-node.js).  

## Settings
All available settings are described in the ***[example .iron-node.js configuration file](/.iron-node.js)***  



## How to find the AppData folder?
```bash
# on Windows
cd %APPDATA%

# on Linux
cd $XDG_CONFIG_HOME
# or
cd ~/.config;

# on OS X
cd ~/Library/Preferences;

# create if not exists
mkdir iron-node;

# Finaly
cd iron-node;
```