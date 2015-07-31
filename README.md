![ironNode](logo/logo.png)  

[![NPM Version](http://img.shields.io/npm/v/iron-node.svg)](https://www.npmjs.org/package/iron-node)
[![Build Status](https://travis-ci.org/s-a/iron-node.svg)](https://travis-ci.org/s-a/iron-node)
[![Codacy Badge](https://www.codacy.com/project/badge/9abe33d152db40bfa5833f2388b32646)](https://www.codacy.com/app/stephanahlf/iron-node)
[![Dependency Status](https://david-dm.org/s-a/iron-node.svg)](https://david-dm.org/s-a/iron-node)
[![devDependency Status](https://david-dm.org/s-a/iron-node/dev-status.svg)](https://david-dm.org/s-a/iron-node#info=devDependencies)
[![NPM Downloads](https://img.shields.io/npm/dm/iron-node.svg)](https://www.npmjs.org/package/iron-node)
[![Massachusetts Institute of Technology (MIT)](https://s-a.github.io/license/img/mit.svg)](/LICENSE.md#mit)
[![Donate](http://s-a.github.io/donate/donate.svg)](http://s-a.github.io/donate/)


## Debug Node.js code with Chrome Developer Tools on Linux, Windows and OS X.
I always hated attaching processes, watching files, restart processes and so on to debug Node.js code. For this reason I wrote this software to make those things easier. With [ironNode](https://github.com/s-a/iron-node) you have the full power of [JavaScript debugging](https://developer.chrome.com/devtools/docs/javascript-debugging) within Chrome Developer Tools.  

## Installation
```npm install iron-node -g;```

## Usage
The usage is exactly the same like ```node```. Just use ```iron-node``` instead of ```node```.  
```bash
iron-node [options]
```

### Debug session
Start a debug session with the given JavaScript file.
```bash
iron-node PATH_TO_NODE_JS_FILE [--customparm1=foo --customparm2=bar];
```  

### Compile native modules
Compile all native modules 'gainst the current installed ironNode v8 version in the given project folder or current working directory.
```bash
iron-node --compile[=PATH_TO_NODE_JS_PROJECT];
```  

### Native :warning:
If you ever get an error while loading native node modules you can activate an overwrite of the internal node [```require```](/app/require.js) function. You can make use of this option after you have re-compiled all native modules in your node project folder with ```--compile```.  *So far this option needs manual activation. May be it defaults to ```true``` in future. Once we have figured out that it is not dangerous* See [How to use native modules?](/docs/NATIVE-MODULES.md) for more details. 
```bash
iron-node --native PATH_TO_NODE_JS_FILE;
```  

## [Screenshots and demos](http://s-a.github.io/iron-node/)

## [Docs](/docs/)
 - [Features](/docs/FEATURES.md)
 - [Version details](/docs/VERSION-DETAILS.md)
 - [How to use native modules?](/docs/NATIVE-MODULES.md)
 - [How to debug Grunt, Gulp, Mocha or other commandline app tasks based on Node.js?](/docs/DEBUG-NODEJS-COMMANDLINE-APPS.md)
 - [How to debug Meteor apps?](/docs/NATIVE-MODULES.md) (Requires further improvements)

## [Contributing](/CONTRIBUTING.md)

## [License](/LICENSE.md)