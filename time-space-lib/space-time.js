var $ = require('jquery');

var SpaceTimeRaw = require('./space-time-raw');
var SpaceTimeDraw = require('./space-time-draw');

module.exports = SpaceTime;

 /**
  * Parses and draws a space time diagrams.
  * @constructor
  * @param {string} text - Raw text with user input.
  */
function SpaceTime(text) { 

	this.text           = text;
	this.parsedElements = new Array();

	/**
    * Parses raw input and create array of space time objects.
    */
	this.parseInput = function()  {
	  var spaceTimeRaw    = new SpaceTimeRaw(this.text);
	  var linesAsArray    = spaceTimeRaw.returnLinesAsArray();
	  this.parsedElements = spaceTimeRaw.returnRawInputAsArray(linesAsArray);
	}

	/**
    * Sets space time diagram atributes and draws space time diagram based on user input.
    * @param {string} elementId - SVG element ID defined in svg tag.
    */
	this.drawInput = function(elementId)  {
	  this.parseInput();
	  var spaceTimeDraw = new SpaceTimeDraw(elementId, 2, 'black', this.parsedElements);
	  spaceTimeDraw.drawHorizontalLines();
	  spaceTimeDraw.identifyLineNames();
	  spaceTimeDraw.drawPoints();
	}

}




