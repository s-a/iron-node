# ironNode Features
People asked for a feature comparison table or want me to tell them why ironNode is "better" than other Node.js debúgging tools. This is not trivial because ironNode uses a different approach and it aims a more easy workflow. 

# ironNode is a debugger no more and no less. 
It does what you expect and it claims to do this with a higher performance than other debug tools in workflow and usage.  
ironNode have the powerful DevTools JavaScript debugger UI under the hood and it provides access to debugging features Chrome DevTools includes.

## Execution controls
Continue, Step over, Step into, Step out, Toggle [conditional] breakpoints, Call Stack panel, Blackbox JavaScript files, Pause on Exceptions, Pause on Uncaught Exceptions.

## Interaction with paused breakpoints
Inspect and edit scopes, variables and object properties, Live Editing, Exception tracking, Viewing exception stack trace and Console output inspection.

#### More... and more.
Detailed description about [javascript debugging](https://developer.chrome.com/devtools/docs/javascript-debugging).

## :yellow_heart: +Features
ironNode have io.js under the hood. As a result of this it supports EcmaScript 6 (ES6 Harmony) out of the box without any precompilers. [Screenshot](http://s-a.github.io/iron-node/iron-node__es6__lg.jpg).  
Restart your project with ```ctrl+r``` shortcut.


## :sunglasses: Cool stuff
ironNode does support themes.  
ironNode does not use WebSockets or something like this. (No connection lost messages or something like that).  
ironNode works independent of local node installation because it has its own.  
No too fast scripts to attach the debugger problems.  
No ```--debug-brk``` or other preperation necessary to start a debug session.  
No UI in a weird states behavior.  
NO UI doesn't load or doesn't work and refresh didn't help behavior  
No debugger takes a long time to start up behavior.

### :no_entry: Limitations
Native modules need a recompilation against the current electron version. Please read ["How to use native modules?"](/docs/NATIVE-MODULES.md).  
As part of design ironNode does not support remote debugging, debugging of many processes (such as cluster).