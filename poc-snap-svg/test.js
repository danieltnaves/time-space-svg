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
  this.sayHello  = function() {
    console.log('say hello');
  }
}
