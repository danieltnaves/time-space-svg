  module.exports = SpaceTimeElement;
  
  /**
  * Represents an element in space time diagram. An element has information about sender, receiver, messageType (SUCCESS or ERROR) and message.
  * @constructor
  * @param {string} sender - Message sender.
  * @param {string} receiver - Message receiver.
  * @param {string} messageType - Indicates if message failed or not.
  * @param {string} message - Message content.
  */
  function SpaceTimeElement(sender, receiver, messageType, message) {

    this.sender      = sender;
    this.receiver    = receiver;
    this.messageType = messageType;
    this.message     = message;

    /**
    * Returns the element name that sends a request.
    * @return {string} Sender name.
    */
    this.getSenderName = function() {
      var senderName = this.sender.split(' ');
      return senderName[0];
    }

    /**
    * Returns the moment that sender makes a request.
    * @return {string} Sender time.
    */
    this.getSenderTime = function() {
      var senderTime = this.sender.split(' ');
      return senderTime[1];
    }

    /**
    * Returns the element name that receives a response.
    * @return {string} Receiver name.
    */
    this.getReceiverName = function() {
      var receiverName = this.receiver.split(' ');
      return receiverName[0];
    }

    /**
    * Returns the moment that receiver receives a response.
    * @return {string} Sender time.
    */
    this.getReceiverTime = function() {
      var receiverTime = this.receiver.split(' ');
      return receiverTime[1];
    }

  }