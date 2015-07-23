var cfg = require("./../ico/.scream.js");
require('should');

describe('valid build file config', function(){

    it('it should contain a url prop', function(){
		for (var fn in cfg.images) {
		 	if (cfg.images.hasOwnProperty(fn)) {
				var img = cfg.images[fn];
				img.url.length.should.be.above(0);
			}
		}
  	});
});