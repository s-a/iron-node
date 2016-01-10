var path = require("path");
var settings = {
  "v8": {
    "flags" : [ 			             // DEFAULT=[]; https://github.com/thlorenz/v8-flags/blob/master/flags-0.11.md
    	"--harmony-arrow-functions"
    ]
  },
  "app": {
    "native+"               : true,   // DEFAULT=FALSE; extends require to search native modules respecting the current v8 engine version.
    "autoAddWorkSpace"      : false,  // DEFAULT=TRUE; disables the autoAddWorkSpace behavior.
    "openDevToolsDetached"  : false,  // DEFAULT=FALSE; opens the dev tools windows detached in an own window.
    "hideMainWindow"        : false,  // DEFAULT=FALSE;  hides the main window to show dev tools only.
  },
  "workSpaceDirectory"        : function(argv) {  // determines the workspace directory for specific commandline applications.
    var result = "";
    if (argv[2]){
      result = path.dirname(argv[2]);
      var startupScriptName = path.basename(argv[2]).toLowerCase();

      switch(startupScriptName) {
          case "_mocha":
            result = process.cwd();
            break;
          default:
            result = path.resolve(result);
            break;
      }
    }

    return result;
  }
};

module.exports = settings;