```bash
## create a meteor build
$ meteor build ../todos-build --debug --directory
$ cd ../todos-build/bundle/programs/server
$ npm install

## compile native modules
$ cd c:\git\todos-build\bundle\
$ iron-node -c

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