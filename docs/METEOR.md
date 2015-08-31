# How to use ironNode with [Meteor](https://www.meteor.com/)?
***Draft (need help to make this work)***  


So far we are only able to debug meteor builds compiled with ```--debug``` .  

The following is what we want to do in future. Note this is a Windows example, but it should be easy for you to adapt for Linux and OS X. **Feel free to contribute to submit your notes for other platforms!**


## Find global meteor installation folder on your machine
```bash
$ where meteor;
# C:\Users\Stephan\AppData\Local\.meteor\meteor.bat
```


## Compile all native modules used by meteor
```bash
$ cd C:\Users\Stephan\AppData\Local\.meteor\packages;
$ iron-node --compile
```

## Create an alias for meteor as iron-meteor
```bash
$ cd c:\Users\Stephan\AppData\Local\.meteor\;
$ cp -rp meteor.bat iron-meteor.bat;
```
Edit iron-meteor.bat  
~~"%~dp0\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\meteor.bat" %*~~  
"%~dp0\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\iron-meteor.bat" %*

```bash
$ cd c:\Users\Stephan\AppData\Local\.meteor\packages\meteor-tool\1.1.3\mt-os.windows.x86_32\; 
$ cp -rp meteor.bat iron-meteor.bat;
```
Edit iron-meteor.bat  
~~"%~dp0\dev_bundle\bin\node.exe" "%~dp0\tools\main.js" %*~~  
iron-node "%~dp0\tools\main.js" %*

## Start Meteor projects with ironNode instead of Meteor
```bash
$ cd your-meteor-project;
$ iron-meteor;
```