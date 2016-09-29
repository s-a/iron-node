// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("ironNode", "icon.png", "panel.html", function(panel) {});



function doc_keyUp(e) {
    alert("a")
    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.ctrlKey && e.keyCode == 65) {
        // call your function to do the thing
        pauseSound();
    }
}
 
document.addEventListener('keyup', doc_keyUp, false);