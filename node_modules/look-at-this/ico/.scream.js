var config = {
	supportedPixelRatios : [1],
	spriteSheetPrefix : "sprite__",							// prefix of spritesheet filenames and classnames
	settings : {
		images : {
			route : "/brands/",
			targetCacheDirectory : __dirname + "/.."
		},
		css: {
			route : "/brands/",
			imageUrl : "",						// points to the target url of image directory. In this case relative to "/assets/css/{pixelResolution}"
			targetCacheDirectory : __dirname + "/../"
		}
	},
	images : {	"delicious-128.png" : {							// alias
		filename : __dirname + "/delicious.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#3274D1",
		url : "https://delicious.com/save?v=5&provider={{provider}}&noui&jump=close&url={{url}}&title={{title}}",
	},
	"digg-128.png" : {							// alias
		filename : __dirname + "/digg-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#14589E",
		url : "http://digg.com/tools/diggthis/confirm?url={{url}}",
	},
	/*"disqus-128.png" : {							
		filename : __dirname + "/disqus-128.png",	
		sprite: "social-icon",						
		batch : [									
			"-resize", "x128"						
		],
		color:"#2E9FFF"
	},
	"dribbble-128.png" : {							// alias
		filename : __dirname + "/dribbble-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#EA4C89"
	},*/
	"email-128.png" : {							// alias
		filename : __dirname + "/email-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#ccc",
		url : "mailto:?subject={{subject}}&body={{body}}"
	},
	"facebook-128.png" : {							// alias
		filename : __dirname + "/facebook-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#3B5998",
		url : "https://www.facebook.com/sharer/sharer.php?u={{url}}&t={{title}}"
	},
	"flattr-128.png" : {							// alias
		filename : __dirname + "/flattr-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#F67C1A",
		url: "https://flattr.com/submit/auto?url={{url}}"
	},
/*	"flickr-128.png" : {							// alias
		filename : __dirname + "/flickr-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#0063DB"
	},*/
	/*"geeklist-128.png" : {							// alias
		filename : __dirname + "/geeklist-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#8CC63E"
	},*/
	"github-128.png" : {									// alias
		filename : __dirname + "/github-128-black.png",		// original filename
		sprite: "social-icon",								// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		
		url : "needs_custom_setup!" 
	},
	"googleplus-128.png" : {							// alias
		filename : __dirname + "/googleplus-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#D14836",
		url : "https://plus.google.com/share?url={{url}}"
	},
	"hackernews-128.png" : {							// alias
		filename : __dirname + "/hackernews-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#FF6600",
		url : "https://news.ycombinator.com/submitlink?u={{url}}&t={{title}}"
	},
	"echojs.png" : {										// alias
		filename : __dirname + "/echojs.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#AA0000",
		url : "http://www.echojs.com/submit?t={{title}}&u={{url}}"
	},
	/*
	"instagram-128.png" : {							// alias
		filename : __dirname + "/instagram-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#3F729B",

	},*/
	"linkedin-128.png" : {							// alias
		filename : __dirname + "/linkedin-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#007FB1",
		url : "http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&source={{provider}}"
	},
	"pinterest-128.png" : {							// alias
		filename : __dirname + "/pinterest-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#CB2027",
		url : "http://pinterest.com/pin/create/bookmarklet/?media={{media}}&url={{url}}&is_video=false&description={{body}}"
	},
	/*"pocket-128.png" : {							// alias
		filename : __dirname + "/pocket-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#EF4056",

	},*/
	"reddit-128.png" : {							// alias
		filename : __dirname + "/reddit-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#FF4500",
		url : "http://reddit.com/submit?url={{url}}&title={{title}}"
	},
	"stumbleupon-128.png" : {							// alias
		filename : __dirname + "/stumbleupon-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#EB4924",
		url : "http://www.stumbleupon.com/submit?url={{url}}&title={{title}}"
	},
	"tumblr-128.png" : {							// alias
		filename : __dirname + "/tumblr-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#2C4762",
		url: "http://www.tumblr.com/share/link?url={{url}}&name={{title}}&description={{body}}"
	},
	"twitter-128.png" : {							// alias
		filename : __dirname + "/twitter-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#00ACED",
		url : "http://www.twitter.com/share?url={{url}}&text={{body}}"
	},
	"xing-128.png" : {							// alias
		filename : __dirname + "/xing-128.png",				// original filename
		sprite: "social-icon",										// determines if the image should be included within specified sprite sheet
		batch : [											// image processing shell scripts with paramters
			"-resize", "x128"								// -size width[xheight][+offset]
		],
		color:"#006567",
		url: "https://www.xing.com/app/user?op=share;url={{url}}"
	}}
};

module.exports = config;