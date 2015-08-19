var settings = {
  "v8": {
    "flags" : [ 			// DEFAULT=[]; https://github.com/thlorenz/v8-flags/blob/master/flags-0.11.md
    	"--harmony-arrow-functions"
	]
  },
  "app": {
    "native+" 			: true, 		// DEFAULT=FALSE; extends require to search native modules respecting the current v8 engine version.
    "autoAddWorkSpace" 	: true, 		// DEFAULT=TRUE; disables the autoAddWorkSpace behavior.
  }
};

module.exports = settings;