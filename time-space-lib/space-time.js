var $ = require('jquery');
var SpaceTimeRaw = require('./space-time-raw');

module.exports = SpaceTime;

function SpaceTime(text) { 

	this.text = text;

	this.parseInput = function()  {
	  var spaceTimeRaw    = new SpaceTimeRaw(this.text);
	  var linesAsArray    = spaceTimeRaw.returnLinesAsArray();
	  var rawInputAsArray = spaceTimeRaw.returnRawInputAsArray(linesAsArray);
	  console.log(rawInputAsArray);
	}

}




