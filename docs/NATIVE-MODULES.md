# Native Node module compatibility

> The native Node modules are supported by Electron, but since Electron is using a different V8 version from official Node, you have to manually specify the location of Electron's headers when building native modules.  
See https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md for more details.

# The following is an example to run [Meteor](https://www.meteor.com/) apps with ironNode on Windows.

```bash
## create a meteor build
$ meteor build ../todos-build --debug --directory

## compile fibers
$ cd c:\git\
$ git clone https://github.com/laverdet/node-fibers.git
$ cd node-fibers
$ set HOME=electron-gyp && node-gyp rebuild --target=0.30.0 --arch=ia32 --dist-url=https://atom.io/download/atom-shell
# copy output to ..todos-build\bundle\programs\server\node_modules\fibers\bin\win32-ia32-v8-4.3\

## compile bcrypt
$ cd c:\git\
$ git clone https://github.com/ncb000gt/node.bcrypt.js.git
$ cd node.bcrypt.js
$ set HOME=electron-gyp && node-gyp rebuild --target=0.30.0 --arch=ia32 --dist-url=https://atom.io/download/atom-shell
# copy output to ..todos-build\bundle\programs\server\npm\npm-bcrypt\node_modules\bcrypt\build\bcrypt_lib.node

## start a mongo db
$ cd c:\git\
$ mkdir mongo
$ mongod --dbpath c:\git\mongo --port 8001

## setup metor environment
$ set MONGO_URL=mongodb://localhost:8001/your_db
$ set ROOT_URL=http://localhost:3000
$ set PORT=3000
$ set BIND_IP=localhost

## start the project
$ cd c:\git\todos-build\bundle\
$ iron-node main.js
```