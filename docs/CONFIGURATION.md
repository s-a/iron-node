# Local and global configuration

Since v1.5.20 ironNode supports local and global configuration via a configuration setup file.
A configuration is saved in a file called [```.iron-node.js```](/.iron-node.js).  
So far you can setup the [v8-flags](https://github.com/thlorenz/v8-flags/blob/master/flags-0.11.md) here.  

ironNode scans the directory of the given JavaScript file first (local). If not found the next try is in ironNode' s ```AppData``` folder (global).  

## How to find the AppData folder?
```bash
# on Windows
cd %APPDATA%\iron-node

# on Linux
cd $XDG_CONFIG_HOME
# or
cd ~/.config;

# on OS X
cd ~/Library/Application Support;

# Finaly
cd iron-node;

# create if not exists
mkdir iron-node;
```