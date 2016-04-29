[![ironNode](logo/logo.png)](http://s-a.github.io/iron-node/)  
[![NPM Version](http://img.shields.io/npm/v/iron-node.svg)](https://www.npmjs.org/package/iron-node)
[![Build Status](https://travis-ci.org/s-a/iron-node.svg)](https://travis-ci.org/s-a/iron-node)
[![Codacy Badge](https://www.codacy.com/project/badge/9abe33d152db40bfa5833f2388b32646)](https://www.codacy.com/app/stephanahlf/iron-node)
[![Dependency Status](https://david-dm.org/s-a/iron-node.svg)](https://david-dm.org/s-a/iron-node)
[![devDependency Status](https://david-dm.org/s-a/iron-node/dev-status.svg)](https://david-dm.org/s-a/iron-node#info=devDependencies)
[![NPM Downloads](https://img.shields.io/npm/dm/iron-node.svg)](https://www.npmjs.org/package/iron-node)
[![Massachusetts Institute of Technology (MIT)](https://s-a.github.io/license/img/mit.svg)](/LICENSE.md#mit)
[![Donate](http://s-a.github.io/donate/donate.svg)](http://s-a.github.io/donate/)


## Debug Node.js code with Chrome Developer Tools on Linux, Windows and OS X.
I hated attaching processes, watching files, restart processes and to debug Node.js code. For this reason I wrote this software to make those things easier. With [ironNode](https://github.com/s-a/iron-node) you have the full power of [JavaScript debugging](https://developer.chrome.com/devtools/docs/javascript-debugging) within Chrome Developer Tools.

## Installation
```npm install iron-node -g;```

## Usage
The usage is the same as ```node```. Use ```iron-node``` instead of ```node```.  
Keep in mind to place the keyword ```debugger;``` to a place where you want to stop. Run a debug session with the given JavaScript file. 
```bash
iron-node PATH_TO_NODE_JS_FILE [--customparm1=foo --customparm2=bar];
```

## Demo
![Version details](/docs/iron-node-demo.gif)

## Supports piped data now
![Debug piped result](/docs/debug-piped-result-of-coffee-script.jpg)

## [More screenshots and demos](http://s-a.github.io/iron-node/)

## [Documentation](/docs/)
 - [Features](/docs/FEATURES.md)
 - [Master the break-points](/docs/MASTER-THE-BREAKPOINTS.md)
 - [How to profile? - Optimize JavaScript execution and discover memory leaks.](/docs/PROFILE.md)
 - [Change electron module version](/docs//CHANGE-ELECTRON-VERSION.md). See #103
 - [Local and global configuration](/docs/CONFIGURATION.md)
 - [How to use native modules?](/docs/NATIVE-MODULES.md)
 - [Packages aka addons or plugins](/docs/PACKAGES.md) -> [Package-Channel](https://www.npmjs.com/browse/keyword/iron-node)
 - [Version details](/docs/VERSION-DETAILS.md)
 - [How to debug Grunt, Gulp, Mocha or other commandline app tasks based on Node.js?](/docs/DEBUG-NODEJS-COMMANDLINE-APPS.md)
 - [Supported platforms](/docs/supported-platforms.md)
 - [How to debug Meteor apps?](/docs/METEOR.md)

## Support
 - https://stackoverflow.com/questions/tagged/iron-node

## [Contributing](/CONTRIBUTING.md)

## [License](/LICENSE.md)
