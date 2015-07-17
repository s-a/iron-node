var electron = require('electron-prebuilt')
var proc = require('child_process')

// will something similar to print /Users/maf/.../Electron
console.log(electron)

// spawn electron
var child = proc.spawn(electron, ["./app", "foo=bar"]);