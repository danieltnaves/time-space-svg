  module.exports = SpaceTimeDraw;
  
  var Snap = require('snapsvg');
  var $    = require('jquery');

  function SpaceTimeDraw(elementId, strokeWidth, strokeColor, parsedElements) {

    this.elementId      = elementId;
    this.strokeWidth    = strokeWidth;
    this.strokeColor    = strokeColor;
    this.parsedElements = parsedElements;
    this.actors         = new Array();
    this.lanes          = new Array();
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
      var elementNames  = new Array();
      var marginCounter = 0;

      //indentify names for each actors and assign values to 'actors' variable
      this.identifyLineNames();

      for (var i = 0; i < this.actors.length; i++) {
        var marginBottom = 10 + marginCounter;
        this.lanes[i] = paper.line(0, marginBottom, 0, marginBottom).attr({strokeWidth:this.strokeWidth, stroke:this.strokeColor, strokeLinecap:"round", markerEnd: marker});
        elementNames[i] = paper.text(920,marginCounter + 15,this.actors[i]).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontWeight: "bold"});
        this.lanes[i].animate({ x1: 10, x2:900}, 1000, mina.easein); 
        marginCounter += 100;  
      }
    }
    
    this.drawPoints = function() {
      for (var i = 0; i < parsedElements.length; i++) {
        var senderVerticalPosition     = ((this.actors.indexOf(parsedElements[i].getSenderName())) * 100) + 10;
        var receiverVerticalPosition   = ((this.actors.indexOf(parsedElements[i].getReceiverName())) * 100) + 10;
        var senderHorizontalPosition   = (parsedElements[i].getSenderTime()) * 10;
        var receiverHorizontalPosition = (parsedElements[i].getReceiverTime()) * 10; 
        
        //circle(x,y,r), x -> x position, y -> y position, r -> radius
        var senderDot = paper.circle(senderHorizontalPosition, senderVerticalPosition, 4).attr({strokeWidth:2,stroke:this.strokeColor,strokeLinecap:"round", fill: this.strokeColor});
        paper.text(senderHorizontalPosition - 7,senderVerticalPosition + 20,parsedElements[i].getSenderTime()).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontSize: "11px"});
        var receiverDot = paper.circle(receiverHorizontalPosition, receiverVerticalPosition, 4).attr({strokeWidth:2,stroke:this.strokeColor,strokeLinecap:"round", fill: this.strokeColor});
        paper.text(receiverHorizontalPosition - 7,receiverVerticalPosition + 20,parsedElements[i].getReceiverTime()).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontSize: "11px"});
      }  
    }

  }