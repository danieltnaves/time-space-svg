function Diagram() {
  this.actors  = [];
  this.entries = [];
}

Diagram.prototype.getActor = function(name) {
  var i;
  var actors = this.actors;
  for (i in actors) {
    if (actors[i] === name) {
      return actors[i];
    }
  }
  i = actors.push(name);
  return actors[ i - 1 ];
};

Diagram.prototype.addEntry = function(entry) {
  this.entries.push(entry);
};

Diagram.Entry = function(actorA, eventA, timeA, messagetype, actorB, eventB, timeB, message) {
  this.actorA          = actorA;
  this.eventA          = typeof eventA === 'string' ? eventA.trim() : eventA;
  this.timeA           = typeof timeA === 'string' ? timeA.trim() : timeA;
  this.messagetype     = messagetype;
  this.actorB          = actorB;
  this.eventB          = typeof eventB === 'string' ? eventB.trim() : eventB;
  this.timeB           = typeof timeB === 'string' ? timeB.trim() : timeB;
  
  //'split' the color parameter from the message parameter
  //we do this because Jison's regex engine does not take in account regex group matching
  var parameters       = (function() {
    var match = message.match(/^([^\r\n]+)(\-\-\w+\s+)(\#[A-Za-z0-9]+)/);
    if(match && match.length > 1) {
      return { 
        message: match[1].trim(), 
        color: match[3]
      };
    } else {
      return {
        message: message.trim()
      }
    }
  }());

  this.message = parameters.message;
  this.color   = parameters.color != null ? parameters.color : '#000000' ;

  this.getMessageType = function() {
    return this.messagetype;
  }

  this.getSenderName = function() {
    return this.actorA;
  }

  this.getReceiverName = function() {
    return this.actorB;
  }

  this.getSenderEvent = function() {
    return this.eventA;
  }

  this.getReceiverEvent = function() {
    return this.eventB;
  }

  this.getSenderTime = function() {
    return this.timeA;
  }

  this.getReceiverTime = function() {
    return this.timeB;
  }

  this.getColor = function() {
    return this.color;
  }

  this.getMessage = function() {
    return this.message;
  }
};

Diagram.translate = function(s) {
  return s.replace(/^(:\s*)/, "").trim();
}

Diagram.MESSAGETYPE = {
  FULL_SUCCESS: 'FULL-SUCCESS',
  HALF_SUCCESS: 'HALF-SUCCESS',
  FULL_ERROR: 'FULL-ERROR',
  HALF_ERROR: 'HALF-ERROR'
};

Diagram.TYPE = {
  SPACETIME: 0,
  HYPERVIS: 1
};

/** The following is included by preprocessor */
// #include "build/grammar.js"

function ParseError(message, hash) {
  this.name = 'ParseError';
  this.message = (message || '');
}
ParseError.prototype = new Error();
Diagram.ParseError = ParseError;

Diagram.parse = function(input) {
  grammar.yy = new Diagram();
  grammar.yy.parseError = function(message, hash) {
    throw new ParseError(message, hash);
  };
  var diagram = grammar.parse(input);
  delete diagram.parseError;
  return diagram;
};