var settings = {
  "v8": {
    "flags" : [ // https://github.com/thlorenz/v8-flags/blob/master/flags-0.11.md
    	"--harmony-arrow-functions"
	]
  },
  "app": {
    "native+" : true // extends require to search native modules respecting the current v8.
  }
};

module.exports = settings;