# How to debug other Node.js command line applications like a Grunt task?

ironNode needs a JavaScript file as entry point for a debug session.  
So first of all you have to locate the global or local installation of the commandline app you want to use. Lets say we want to debug a Grunt task.  
The ```where``` command will tell us the location of the commandline bash script file. Open it and find out to which JavaScript file the bash script points. In some cases this could be a JavaScript file a directly.

In my case of Grunt (on Windows) this is ```$AppData$\Roaming\npm\node_modules\grunt-cli\bin\grunt```

Now it is easy to start a debug session by passing the JavaScript File to ironNode

## Windows example
```bash
$ cd your-project folder
$ iron-node $AppData$\Roaming\npm\node_modules\grunt-cli\bin\grunt [taskname]
```


## :warning: Heads Up!
Some command line apps may use native modules. Please read [How to use native modules?](/docs/NATIVE-MODULES.md).  
***Feel free to [submit an issue](https://github.com/s-a/iron-node/issues) if you are affected by such an incompatibility.***  