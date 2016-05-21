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
      var values = $.trim(text);
      values = text.split('\n');
      //clean empty values
      for (var i = 0; i < values.length; i++) {
        values[i] = $.trim(values[i]);
      }
      values = values.filter(function(n){ return n }); 
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
      //identify messageType (- = SUCCESS or x = ERROR)
      var message = $.trim(text);
      message = message.split(':');
      messageType = message[3];
      if (messageType == '-') {
        messageType = 'SUCCESS';
      } else {
        messageType = 'ERROR';
      }
      return new SpaceTimeElement(message[0], message[1], message[2], messageType, message[4], message[5], message[6], message[7], message[8]);
    }

  }