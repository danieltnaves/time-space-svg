  module.exports = SpaceTimeDraw;
  
  var Snap = require('snapsvg');
  var $    = require('jquery');

  function SpaceTimeDraw(elementId, strokeWidth, strokeColor, parsedElements) {

    //this.paperHeight   = paperWidth;
    //this.paperWidth    = paperHeight; 
    this.elementId      = elementId;
    this.strokeWidth    = strokeWidth;
    this.strokeColor    = strokeColor;
    this.parsedElements = parsedElements;
    this.actors         = new Array();
    var paper           = Snap(this.elementId);

    this.identifyLineNames = function() {
      for (var i = 0; i < parsedElements.length; i++) {
        if ($.inArray(parsedElements[i].getSenderName(), this.actors) == -1) {
          this.actors.push(parsedElements[i].getSenderName());
        }
        if ($.inArray(parsedElements[i].getReceiverName(), this.actors) == -1) {
          this.actors.push(parsedElements[i].getReceiverName());
        } 
      }
      return this.actors;
    }

    this.drawHorizontalLines = function(horizontalinesNumber) { 
      //creates right arrow
      var arrow         = paper.polygon([0,10, 4,10, 2,0, 0,10]).attr({fill: this.strokeColor}).transform('r90');
      var marker        = arrow.marker(0,0, 20,20, 0,5);
      var lanes         = new Array();
      var elementNames  = new Array();
      var marginCounter = 0;

      //indentify names for each actors and assign values to 'actors' variable
      this.identifyLineNames();

      for (var i = 0; i < this.actors.length; i++) {
        var marginBottom = 10 + marginCounter;
        lanes[i] = paper.line(0, marginBottom, 0, marginBottom).attr({strokeWidth:this.strokeWidth, stroke:this.strokeColor, strokeLinecap:"round", markerEnd: marker});
        elementNames[i] = paper.text(920,marginCounter + 15,this.actors[i]).attr({fill: this.strokeColor, fontFamily: "Arial"});
        lanes[i].animate({ x1: 10, x2:900}, 1000, mina.easein); 
        marginCounter += 100;  
      }
    }

  }