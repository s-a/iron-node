# Create Chrome Profiles
Since there are a lot of documentations about how to profile out there this is just a simple link list with usefull resources.

## Record profiles programmatically via JavaScript

### [console.profile](https://developer.chrome.com/devtools/docs/console-api#consoleprofilelabel)

> When the Chrome DevTools is open, calling this function starts a JavaScript CPU profile with an optional label.To complete the profile, call console.profileEnd(). Each profile is added to the Profiles tab.    In the following example a CPU profile is started at the entry to a function that is suspected to consume excessive CPU resources, and ended when the function exits.  

```javascript
console.profile("foo");
/* code you want to profile */
console.profileEnd();
```

### [console.time](https://developer.chrome.com/devtools/docs/console-api#consoletimelabel)

> Starts a new timer with an associated label. When console.timeEnd() is called with the same label, the timer is stopped the elapsed time displayed in the Console. Timer values are accurate to the sub-millisecond.  

```javascript
console.time("foo");
/* code you want to meassure */
console.timeEnd("foo")
```


### Introducing topics (Just for the point of interest - (You you might want to skip))

#### Node.js built in profiler
> There are many third party tools available for profiling Node.js applications but, in many cases, the easiest option is to use the Node.js built in profiler. The built in profiler uses the profiler inside V8 which samples the stack at regular intervals during program execution. It records the results of these samples, along with important optimization events such as jit compiles, as a series of ticks:

Easy profiling for Node.js Applications  
 - [https://nodejs.org/en/docs/guides/simple-profiling/](https://nodejs.org/en/docs/guides/simple-profiling/)  
 - [https://developers.google.com/v8/profiler_example](https://developers.google.com/v8/profiler_example)  

## ironNode (Chrome DevTools) related topics

#### Docs
 - [Speed Up JavaScript Execution | Web Tools - Google Developers](https://developers.google.com/web/tools/chrome-devtools/profile/rendering-tools/js-execution)  
 - [Fix Memory Problems | Web Tools - Google Developers](https://developers.google.com/web/tools/chrome-devtools/profile/memory-problems/?hl=en)  
 - [Chrome Profile Overview](https://developers.google.com/web/tools/chrome-devtools/profile/?hl=en)  

#### Videos
 - "Google I/O 2012 - Breaking the JavaScript Speed Limit with V8" on YouTube  [!["Google I/O 2012 - Breaking the JavaScript Speed Limit with V8" on YouTube](http://img.youtube.com/vi/UJPdhx5zTaw/0.jpg)](https://youtu.be/UJPdhx5zTaw)   
 - "Google Chrome Developer Tools: Profiling and optimizing" on YouTube  [!["Google Chrome Developer Tools: Profiling and optimizing" on YouTube](http://img.youtube.com/vi/OxW1dCjOstE/0.jpg)](https://youtu.be/OxW1dCjOstE)   
 - "Detecting Memory Leaks Using Chrome Developer Tools" on YouTube  [!["Detecting Memory Leaks Using Chrome Developer Tools" on YouTube](http://img.youtube.com/vi/j4Uvk5zxrhM/0.jpg)](https://youtu.be/j4Uvk5zxrhM)   


:warning: Let me know if have usefull resources you are missing here.