  module.exports = SpaceTimeDraw;
  
  var Snap = require('snapsvg');
  var $    = require('jquery');

  /**
  * Class responsible for draw all elements in space time diagram.
  * @constructor
  * @param {string} elementId - SVG element ID.
  * @param {string} strokeWidth - Sets width for all lines.
  * @param {string} strokeColor - Sets colors for all elements.
  * @param {string} parsedElements - List of elements to be drawed.
  * @param {string} options - Extra options to show diagram separated by ','.
  */
  function SpaceTimeDraw(elementId, strokeWidth, strokeColor, parsedElements, options) {

    this.elementId          = elementId;
    this.strokeWidth        = strokeWidth;
    this.strokeColor        = strokeColor;
    this.parsedElements     = parsedElements;
    this.actors             = new Array();
    this.lanes              = new Array();
    var  paper              = Snap(this.elementId); 
    this.animationsPaths    = new Array();
    this.interactionStatus  = new Array();
    this.options            = options.split(',');
    this.verticalDrawSkew   = 20;
    this.errorMessages      = '';
    this.lineNumbers        = 1;

    /**
    * Return parse error messages.
    * @return {boolean} True if all fields was filled and false otherwise.
    */
    this.getErrorMessages = function() {
      return this.errorMessages;
    }

    /**
    * Verify if all required fields was filled.
    * @return {boolean} True if all fields was filled and false otherwise.
    */
    this.validateElements = function() {
      for (var i = 0; i < parsedElements.length; i++) {
        if (parsedElements[i].getSenderName() == '' || parsedElements[i].getReceiverName() == '') {
          this.errorMessages += '\n' + 'Sender and receiver names are required.'
          return false;
        }
        if (parsedElements[i].getSenderTime() == '' || parsedElements[i].getReceiverTime() == '') {
          this.errorMessages += '\n' + 'Sender time and receiver time names are required.'
          return false;
        }
      }
      return true;
    }

    /**
    * Returns a list of actors to draw horizontal lines.
    * @return {Array} Array of actors names.
    */
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

    /**
    * Draws horizontal lines based on number of actors assigned 'this.actors' variable. 
    */ 
    this.drawHorizontalLines = function() { 
      //line size based in last element
      var lineSize = (this.parsedElements[this.parsedElements.length - 1].getReceiverTime() * 10) + 40;
      //clear paper from previous submission
      paper.clear();
      //add svg paper max width
      paper.attr({width: lineSize + 20});
      //creates right arrow
      var arrow         = paper.polygon([0,10, 4,10, 2,0, 0,10]).attr({fill: this.strokeColor}).transform('r90');
      var marker        = arrow.marker(0,0, 20,20, 0,5);
      var elementNames  = new Array();
      var marginCounter = 0;

      //indentify names for each actors and assign values to 'actors' variable
      this.identifyLineNames();

      for (var i = 0; i < this.actors.length; i++) {
        var marginBottom = 10 + marginCounter + this.verticalDrawSkew;
        this.lanes[i] = paper.line(0, marginBottom, 0, marginBottom).attr({strokeWidth:this.strokeWidth, stroke:this.strokeColor, strokeLinecap:"round", markerEnd: marker});
        elementNames[i] = paper.text(5,marginCounter + 15 + this.verticalDrawSkew,this.actors[i]).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontWeight: "bold"});
        this.lanes[i].animate({ x1: 20, x2:lineSize}, 1000, mina.easein); 
        marginCounter += 100;  
      }
    }
    
    /**
    * Draws all points represented by a circle that sends and receives messages in space time diagram. 
    */
    this.drawPoints = function() {
      var animationsPaths = new Array();
      for (var i = 0; i < parsedElements.length; i++) {
        var senderVerticalPosition     = ((this.actors.indexOf(parsedElements[i].getSenderName())) * 100) + 10;
        var receiverVerticalPosition   = ((this.actors.indexOf(parsedElements[i].getReceiverName())) * 100) + 10;
        var senderHorizontalPosition   = (parsedElements[i].getSenderTime()) * 10 + this.verticalDrawSkew;
        var receiverHorizontalPosition = (parsedElements[i].getReceiverTime()) * 10 + this.verticalDrawSkew; 
        
        //circle(x,y,r), x -> x position, y -> y position, r -> radius
        var senderDot = paper.circle(senderHorizontalPosition, senderVerticalPosition + this.verticalDrawSkew, 4).attr({strokeWidth:2,stroke:this.strokeColor,strokeLinecap:"round", fill: this.strokeColor});
        if ($.inArray('label', this.options) > -1) {
          paper.text(senderHorizontalPosition - 7,senderVerticalPosition - 10 + this.verticalDrawSkew,parsedElements[i].getSenderLabel()).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontSize: "11px"});
        }
        if ($.inArray('time', this.options) > -1) {
          paper.text(senderHorizontalPosition - 7,senderVerticalPosition + 20 + this.verticalDrawSkew,parsedElements[i].getSenderTime()).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontSize: "11px"});
        }
        var receiverDot = paper.circle(receiverHorizontalPosition, receiverVerticalPosition + this.verticalDrawSkew, 4).attr({strokeWidth:2,stroke:this.strokeColor,strokeLinecap:"round", fill: this.strokeColor});
        if ($.inArray('label', this.options) > -1) {
          paper.text(receiverHorizontalPosition - 7,receiverVerticalPosition - 10 + this.verticalDrawSkew,parsedElements[i].getReceiverLabel()).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontSize: "11px"});
        }
        if ($.inArray('time', this.options) > -1) {
          paper.text(receiverHorizontalPosition - 7,receiverVerticalPosition + 20 + this.verticalDrawSkew,parsedElements[i].getReceiverTime()).attr({fill: this.strokeColor, fontFamily: "Arial", fontStyle: "italic", fontSize: "11px"});
        }

        var pathCords = 'M ' + senderHorizontalPosition + ' ' + (senderVerticalPosition + this.verticalDrawSkew) + ' ' + 'L ' + receiverHorizontalPosition + ' ' + (receiverVerticalPosition + this.verticalDrawSkew);
        //M x y -> represents start point
        //L x y -> represents "Line to"
        this.animationsPaths.push(pathCords);
        this.interactionStatus.push(parsedElements[i].getMessageType());
      }
      this.animatePaths();
    }
    
    /**
    * Animates paths and arrows using progressive effect. This method is called recursively using this.animationsPaths where:
    * M x y -> represents start point and L x y -> represents "Line to".
    */
    this.animatePaths = function() {
        if (this.animationsPaths.length == 0) return;
        var line2 = paper.path(this.animationsPaths[0]);
        var lengthLine2 = line2.getTotalLength() - 8;
        var status = this.interactionStatus[0];
        
         if ($.inArray('contents', this.options) > -1) {
            var label = paper
            .text(0, 0, this.lineNumbers + ' - ' + parsedElements[0].getMessage())
            .attr({
                'text-anchor' : 'middle',
                'textpath' : this.animationsPaths[0],
                'dy': -5,
                fill: this.strokeColor,  
                fontFamily: "Arial", 
                fontStyle: "italic", 
                fontSize: "11px"
            });
            label.textPath.attr({ startOffset: '50%' });
            this.lineNumbers++;
          }

        this.animationsPaths.shift();
        this.interactionStatus.shift();
        this.parsedElements.shift();

        var Triangle = paper.polyline("-4.5,5.5 0.5,-4.5 5.5,5.5");
        Triangle.attr({
          fill: "#000"
        });  

        var triangleGroup = paper.g(Triangle); // Group polyline

        Snap.animate(0, lengthLine2 - 1, function(value) {
           movePoint = line2.getPointAtLength(value);
           triangleGroup.transform('t' + parseInt(movePoint.x) + ',' + parseInt(movePoint.y) + 'r' + (movePoint.alpha - 90));
        }, 500, mina.easeinout);

        if (status == 'ERROR') {
          lengthLine2 = '3,3';
        }



        line2.attr({
            stroke: '#000',
            strokeWidth: 3,
            fill: 'none',
            // Draw Path
            "stroke-dasharray": lengthLine2,
            "stroke-dashoffset": lengthLine2
        }).animate({"stroke-dashoffset": 0}, 500, mina.easeinout, this.animatePaths.bind( this ));
      }

    }
  