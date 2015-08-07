# Draft (need help to make this work)

## How to ride the [Meteor](https://www.meteor.com/) bullet?
So far we are only able to debug meteor builds compiled with --debug without any database dependencies.
https://github.com/s-a/iron-node/issues/1#issuecomment-127979103


The following is what we want to do in future.

```bash
# Find and change current directory to your global meteor installation.
$ where meteor;
# C:\Users\Stephan\AppData\Local\.meteor\meteor.bat
$ cd C:\Users\Stephan\AppData\Local\.meteor\packages;

# recompile native modules
# FIXME:
$ iron-node --compile # fails to compile sqlite3, ws maybe others :( ; blocked by https://github.com/mapbox/node-pre-gyp/issues/110
```

# route metoer to ironNode

We need somthing that mimics the bash commands to something new maybe a command ```ironMeteor```

Instead of ```node``` it have to call ```ironNode``` command. https://github.com/meteor/meteor/blob/devel/meteor#L136