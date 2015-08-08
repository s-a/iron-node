# Draft (need help to make this work)

## How to ride the [Meteor](https://www.meteor.com/) bullet?
So far we are only able to debug meteor builds compiled with --debug without any database dependencies.
This is because we cannot compile sqlite3 at the moment (coming soon)

The following is what we want to do in future. Note this is a Windows example, but it should be easy for you to adapt for Linux and OS X. Contribute to submit your notes for other platforms!


### Find global meteor installation folder on your machine
```bash
$ where meteor;
# C:\Users\Stephan\AppData\Local\.meteor\meteor.bat
```


### Compile native modules used by meteor
Blocked by https://github.com/mapbox/node-pre-gyp/issues/110.
```bash
$ cd C:\Users\Stephan\AppData\Local\.meteor\packages;

# recompile native modules
# fails to compile sqlite3 :(
$ iron-node --compile
```

## Create an alias for meteor as iron-meteor
```bash
$ cp -rp c:\Users\Stephan\AppData\Local\.meteor\meteor.bat c:\Users\Stephan\AppData\Local\.meteor\iron-meteor.bat ;
```
Edit:
```bash
rem "%~dp0\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\meteor.bat" %*
"%~dp0\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\iron-meteor.bat" %*
```

```bash
$ cp -rp c:\Users\Stephan\AppData\Local\.meteor\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\meteor.bat c:\Users\Stephan\AppData\Local\.meteor\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\iron-meteor.bat;
```
Edit:
```bash
rem "%~dp0\dev_bundle\bin\node.exe" "%~dp0\tools\main.js" %*
iron-node "%~dp0\tools\main.js" %*
```