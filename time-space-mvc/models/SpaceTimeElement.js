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

    this.getSenderName = function() {
      var senderName = this.sender.split(' ');
      return senderName[0];
    }

    this.getSenderTime = function() {
      var senderTime = this.sender.split(' ');
      return senderTime[1];
    }

    this.getReceiverName = function() {
      var receiverName = this.receiver.split(' ');
      return receiverName[0];
    }

    this.getReceiverTime = function() {
      var receiverTime = this.receiver.split(' ');
      return receiverTime[1];
    }

  }