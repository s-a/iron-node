# ironNode packages
ironNode use [package.js](https://github.com/s-a/package.js) to open the software to plugin developers. 
If exists it scans the AppData directory for installed plugins.  

To install a Plugin: 

```bash
cd ...
%APPDATA% # on Windows
$XDG_CONFIG_HOME or ~/.config # on Linux
~/Library/Application Support # on OS X
mkdir iron-node;
npm install your-plugin;
```
