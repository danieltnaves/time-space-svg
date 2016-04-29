  module.exports = SpaceTimeElement;
  
  /**
  * Represents an element in space time diagram. An element has information about sender, receiver, messageType (SUCCESS or ERROR) and message.
  * @constructor
  * @param {string} sender - Message sender.
  * @param {string} senderLabel - Message sender label.
  * @param {string} senderTime - Message sender time.
  * @param {string} receiver - Message receiver.
  * @param {string} receiverLabel - Message receiver label.
  * @param {string} receiverTime - Message receiver time.
  * @param {string} messageType - Indicates if message failed or not.
  * @param {string} message - Message content.
  */
  function SpaceTimeElement(sender, senderTime, senderLabel, messageType, receiver, receiverTime, receiverLabel, message) {

    this.sender         = sender;
    this.senderLabel    = senderLabel;
    this.senderTime     = senderTime;

    this.receiver       = receiver;
    this.receiverLabel  = receiverLabel;
    this.receiverTime   = receiverTime;

    this.messageType    = messageType;
    this.message        = message;

    /**
    * Returns the element name that sends a request.
    * @return {string} Sender name.
    */
    this.getSenderName = function() {
      return this.sender;
    }

    /**
    * Returns the element label that sends a request.
    * @return {string} Sender label.
    */
    this.getSenderLabel = function() {
      return this.senderLabel;
    }

    /**
    * Returns the element sender time.
    * @return {string} Sender time.
    */
    this.getSenderTime = function() {
      return this.senderTime;
    }

    /**
    * Returns the element name that receives a response.
    * @return {string} Receiver name.
    */
    this.getReceiverName = function() {
      return this.receiver;
    }

    /**
    * Returns the element label that receives a response.
    * @return {string} Receiver label.
    */
    this.getReceiverLabel = function() {
      return this.receiverLabel;
    }

    /**
    * Returns the element receiver time.
    * @return {string} Receiver time.
    */
    this.getReceiverTime = function() {
      return this.receiverTime;
    }

    /**
    * Returns message type (SUCCESS ou ERROR).
    * @return {string} Message type.
    */
    this.getMessageType = function() {
      return this.messageType;
    }

    /**
    * Returns message.
    * @return {string} Message.
    */
    this.getMessage = function() {
      return this.message;
    }


  }