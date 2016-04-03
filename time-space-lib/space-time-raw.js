  var $ = require('jquery');
  var SpaceTimeElement = require('./space-time-element');

  module.exports = SpaceTimeRaw;

  /**
  * Represents an element in space time diagram with string input.
  * @constructor
  * @param {string} text - Raw string that represents space time diagram.
  */
  function SpaceTimeRaw(text) {

    this.text = text;

    /**
    * Returns raw input as array.
    * @return {Array} Array with lines splited by '\n'.
    */
    this.returnLinesAsArray = function()  {
      var values = text.split('\n');
      //remove last element (empty)
      values.splice(-1,1);
      return values;
    }

    /**
    * Returns raw input as array.
    * @param {Array} lines - Lines with raw text.
    * @return {Array} Array of SpaceTimeElement.
    */
    this.returnRawInputAsArray = function(lines) {
      var spaceTimeElementLines = new Array();
      for (var i = 0; i < lines.length; i++) {
        spaceTimeElementLines[i] = this.itentifyNodeElement(lines[i]);
      }  
      return spaceTimeElementLines;
    }

    /**
    * Returns SpaceTimeElement object from given string.
    * @param {string} text - Raw text.
    * @return {SpaceTimeElement} SpaceTimeElement.
    */
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