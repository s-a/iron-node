# How to debug other Node.js command line applications like a Grunt task?

ironNode needs a JavaScript file as entry point for a debug session.  
So first of all you have to locate the global or local installation of the commandline app you want to use.  

Here we have a handy collection of scripts. You can simply copy and paste them into the ```scripts``` section of your ```package.json```. Feel free to :tada: contribute and add your scripts here!

## debug script calls
```javascript
  ...
  "scripts": {
    ...
    "debug-mocha": "iron-node node_modules/mocha/bin/_mocha",
    "debug-grunt": "iron-node node_modules/grunt-cli/bin/grunt build",
    "debug-gulp": "iron-node node_modules/gulp/bin/gulp.js",
    ...
  },
  ...
```

Now it is easy to start a debug session using ```npm run ...```.  

## usage
```bash
  $ cd your-project-path;
  $ npm run debug-mocha;
```

## :warning: Heads Up!
Some command line apps may use native modules. Please read [How to use native modules?](/docs/NATIVE-MODULES.md).  