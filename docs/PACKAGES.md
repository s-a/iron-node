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


## For package developers.
A ironNode package is identified by ```iron_node_package : true``` within package.json.

## Example package

### package.json
{
  "name": "iron-node-theme",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "iron_node_package": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stephan Ahlf <stephan.ahlf@gmail.com> (https://github.com/s-a)",
  "license": "ISC"
}


### index.js
```javascript
var path = require("path");

// CSS injection
var style = document.createElement("style");
style.setAttribute('type', 'text/css');
style.innerHTML = "body{background-color:yellow}";
window.document.head.appendChild(style);

// external CSS file
var style2 = document.createElement("link");
style2.setAttribute('rel', 'stylesheet');
style2.setAttribute('type', 'text/css');
style2.setAttribute('href', 'file://' + path.join(__dirname, "custom.css"));
window.document.head.appendChild(style2);
```

### custom.css
```css
/*custom.css*/
body{
    color:cyan;
}
```
