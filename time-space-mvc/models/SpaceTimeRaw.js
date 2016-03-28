  /**
  * Represents an element in space time diagram with string input.
  * @constructor
  * @param {string} text - Raw string that represents space time diagram.
  */
  function SpaceTimeRaw(text) {

    this.text = text;

    /**
    * Returns raw input as array.
    * @param {string} text - Raw text.
    * @return {Array} Array with lines splited by '\n'.
    */
    this.returnLinesAsArray = function(text)  {
      var values = text.split('\n');
      //remove last element (empty)
      values.splice(-1,1);
      return values;
    }

    this.iterateArrayLines = function(lines) {
      var spaceTimeElementLines = new Array();
      for (var i = 0; i < lines.length; i++) {
        spaceTimeElementLines[i] = itentifyNodeElement(lines[i]);
      }  
      return spaceTimeElementLines;
    }

    this.itentifyNodeElement = function(text) {
      //identify messageType (-> = SUCCESS or x = ERROR)
      var messageType = text.match("\\[(.*?)\\]");
      messageType = messageType[1];
      if (messageType == '->') {
        messageType = 'SUCCESS';
      } else {
        messageType = 'ERROR';
      }
      //identify sender and receiver
      var keyPair  = text.split('[');
      var sender   = keyPair[0].match("\\((.*?)\\)")[1];
      var receiver = keyPair[1].match("\\((.*?)\\)")[1];
      //identify message
      var message = $.trim(text.split(':')[1]);
      return new SpaceTimeElement(sender, receiver, messageType, message);
    }


  }