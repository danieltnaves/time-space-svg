var $ = require('jquery');

var SpaceTimeRaw = require('./space-time-raw');
var SpaceTimeDraw = require('./space-time-draw');

module.exports = SpaceTime;

function SpaceTime(text) { 

	this.text           = text;
	this.parsedElements = new Array();

	this.parseInput = function()  {
	  var spaceTimeRaw    = new SpaceTimeRaw(this.text);
	  var linesAsArray    = spaceTimeRaw.returnLinesAsArray();
	  this.parsedElements = spaceTimeRaw.returnRawInputAsArray(linesAsArray);
	}

	this.drawInput = function(elementId)  {
	  this.parseInput();
	  var spaceTimeDraw = new SpaceTimeDraw(elementId, 2, 'black', this.parsedElements);
	  spaceTimeDraw.drawHorizontalLines(3);
	  spaceTimeDraw.identifyLineNames();
	  spaceTimeDraw.drawPoints();
	  //console.log(spaceTimeDraw);
	}

}




