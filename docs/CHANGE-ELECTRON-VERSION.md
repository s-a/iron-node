# Change electron-prebuilt version

```bash
# find iron-node installation
$ where iron-node;
# -> C:\Users\sahlf\AppData\Roaming\npm\iron-node  

$ cd c:\Users\sahlf\AppData\Roaming\npm\node_modules\iron-node\;
$ npm unstinall electron-prebuilt;
$ npm install electron-prebuilt@YOUR_VERSION_NUMBER --save
