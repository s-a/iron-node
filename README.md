![ironNode](logo/logo.png)

[![Build Status](https://travis-ci.org/s-a/iron-node.svg)](https://travis-ci.org/s-a/iron-node)
[![NPM Version](http://img.shields.io/npm/v/iron-node.svg)](https://www.npmjs.org/package/iron-node)
[![NPM Downloads](https://img.shields.io/npm/dm/iron-node.svg)](https://www.npmjs.org/package/iron-node)
[![Dependency Status](https://david-dm.org/s-a/iron-node.svg)](https://david-dm.org/s-a/iron-node)
[![devDependency Status](https://david-dm.org/s-a/iron-node/dev-status.svg)](https://david-dm.org/s-a/iron-node#info=devDependencies)
[![Donate](http://s-a.github.io/donate/donate.svg)](http://s-a.github.io/donate/)

## Debug Node.js code with Google Chrome Developer Tools on Linux, Windows and OS X.
I always hate attaching processes, watching files, restart processes and so on to debug Node.js code. For this reason I wrote this software to make those things easier. With [ironNode](https://github.com/s-a/iron-node) you have the full power of [JavaScript debugging](https://developer.chrome.com/devtools/docs/javascript-debugging) within Google Chrome' s Developer Tools.

## Installation
```npm install iron-node -g;```

### :warning:
 - You may need administration rights. So use ```$ sudo npm install iron-node -g;```
 - To stop with the debugger at the code line you want you need to place the keyword ```debugger;``` in your source code.

## Usage
The usage is exactly the same like ```node```. Just use ```iron-node``` instead of ```node```.
```iron-node PATH_TO_NODE_JS_FILE [--customparm1=foo --customparm2=bar];```

For example:
```iron-node ~/tmp/nod.js```

![Screenshot](screenshot.png)

## Demo
[https://youtu.be/pxq6zdfJeNI](https://youtu.be/pxq6zdfJeNI)

## [Contributing](/CONTRIBUTING.md)

[<img src="https://s-a.github.io/license/img/mit.svg" />](/LICENSE.md#mit "Massachusetts Institute of Technology (MIT)")
Copyright (c) 2015 Stephan Ahlf <stephan.ahlf@gmail.com>
This software is licensed under MIT.