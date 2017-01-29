var SpaceTimeDraw = require('../space-time-draw');

(function() {

/** The following is included by preprocessor */
// #include "build/diagram-grammar.js"

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
		this.parsedElements = Diagram.parse(this.text).entries;
	}

	/**
    * Sets space time diagram atributes and draws space time diagram based on user input.
    * @param {string} elementId - SVG element ID defined in svg tag.
    * @param {string} options - Extra options to show diagram separated by ','.
    */
	this.drawInput = function(elementId, options)  {
		this.parseInput();
		var spaceTimeDraw = new SpaceTimeDraw(elementId, 2, 'black', this.parsedElements, options);	 
		if (spaceTimeDraw.validateElements()) {
			spaceTimeDraw.identifyLineNames();
			spaceTimeDraw.drawHorizontalLines();
			spaceTimeDraw.drawPoints();
		} else {
			alert(spaceTimeDraw.getErrorMessages());
		}
	}
}

window.SpaceTime = SpaceTime;

}());