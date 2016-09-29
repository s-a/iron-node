// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

 

document.querySelector('#executescript').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "code", content: "window.close();"});
}, false);

document.querySelector('#insertscript').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
}, false);

document.querySelector('#insertmessagebutton').addEventListener('click', function() {
    sendObjectToInspectedPage({action: "code", content: "document.body.innerHTML='<button>Send message to DevTools</button>'"});
    sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
}, false);