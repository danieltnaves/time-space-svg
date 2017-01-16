var fs = require("browserify-fs");
var jison = require("jison");

var bnf = fs.readFile("grammar.jison", "utf-8", function(err, data) {
	console.log(data);
});
var parser = new jison.Parser(bnf);

module.exports = parser;