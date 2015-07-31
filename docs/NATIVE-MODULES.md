# Native Node module compatibility

> The native Node modules are supported by Electron, but since Electron is using a different V8 version from official Node, you have to manually specify the location of Electron's headers when building native modules.  
See https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md for more details.

*I published https://github.com/s-a/electron-recompile which aims to help with compile native modules for a specific electron version. Unfortunately it seems that there is no standard for requiring native modules in packages which cares about different versions.*

For example NSLog simply searches like this 
```javascript
  NSLog = require('../build/Release/nslog.node');
```

A very good approach for me is available at the fibers source code which searches with a little bit more logic.
```javascript
// Look for binary for this platform
var v8 = 'v8-'+ /[0-9]+\.[0-9]+/.exec(process.versions.v8)[0];
var modPath = path.join(__dirname, 'bin', process.platform+ '-'+ process.arch+ '-'+ v8, 'fibers');
try {
	fs.statSync(modPath+ '.node');
} catch (ex) {
	// No binary!
	throw new Error('`'+ modPath+ '.node` is missing. Try reinstalling `node-fibers`?');
}
```

However, normaly it depends on the Node.js module if you can manage different native versions at the same time.


To make a long story short...  

## Compile all native modules in Node.js project
I implemented both [```electron-recompile```](https://github.com/s-a/electron-recompile) and [```Node Module Path```](https://github.com/s-a/nmp) to realise a "re-compile" feature.  
By ```calling iron-node --compile[=your-node-project-path]``` you can recompile all native modules in the ```node_modules``` subfolder or the current workking directory against the current installed iron-node v8 version.  

## Native
If you ever get an error while loading native node modules you can activate an overwrite of the internal node [```require```](/../app/require.js) function. You can make use of this option after you have re-compiled all native modules in your node project folder with ```iron-node --compile```.  *So far this option needs manual activation. May be it defaults to ```true``` in future. Once we have figured out that it is not dangerous :flushed:*. 
