var fs = require('fs');
var path = require('path');
require('should');
var jshint = require("jshint");

var jshintrcFilename = path.join(__dirname, "/../", ".jshintrc");
var jshintrc = JSON.parse(fs.readFileSync(jshintrcFilename));

var getLineEndingsStyle = function(fn){
	var result = "unknown";
	var styles = {
		'unix': /[^\r]\n/,
		'osx': /\r/,
		'windows': /\r\n/
	};

	var text = fs.readFileSync(fn);
	for (var os in styles) {
		if (styles.hasOwnProperty(os)){
			var regex = styles[os];
			if(regex.test(text)){
				result = os;
			}
		}
	}
	return result;
}

var processJsHint = function(fn) {
		var code = fs.readFileSync(fn).toString();
		jshint.JSHINT(code, jshintrc);
		var data = jshint.JSHINT.data();
		var errors = data.errors;
		return errors;
};

var preProcessJsHint = function  (fn) {
	return function(){
		var report = processJsHint(fn);
		var success = (report === undefined);
		if (report){
			console.log("JSHINT success:", success, report);
		}

		success.should.equal(true);
	}
};

var javascriptFilesToTest = [];
javascriptFilesToTest.push(path.join(__dirname, "..", "bin", "run.js"));
javascriptFilesToTest.push(path.join(__dirname, "..", "app", "app.js"));
javascriptFilesToTest.push(path.join(__dirname, "..", "app", "index.js"));
javascriptFilesToTest.push(path.join(__dirname, "..", "app", "menu.js"));
javascriptFilesToTest.push(path.join(__dirname, "..", "app", "require.js"));
javascriptFilesToTest.push(path.join(__dirname, "..", "app", "config.js"));
javascriptFilesToTest.push(path.join(__dirname, "main.js"));



describe('unix-style', function(){
	it('run.js', function(){
		getLineEndingsStyle(path.join(__dirname, "..", "bin", "run.js")).should.equal("unix");
	});
});

describe('jshint', function(){
	for (var i = 0; i < javascriptFilesToTest.length; i++) {
		var fn = javascriptFilesToTest[i];
		it('should pass jshint tests for ' + fn, preProcessJsHint(fn));
	}
});