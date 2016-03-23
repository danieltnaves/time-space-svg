  /**
  * Represents an element in space time diagram. An element has information about sender, receiver, messageType (SUCCESS or ERROR) and message.
  * @constructor
  * @param {string} sender - Message sender.
  * @param {string} receiver - Message receiver.
  * @param {string} messageType - Indicates if message failed or not.
  * @param {string} message - Message content.
  */
  function IndexController() {

    //this.sender      = sender;

    this.index = function() {
      var senderName = this.sender.split(' ');
      return senderName[0];
    }

  }