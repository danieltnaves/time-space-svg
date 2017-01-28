//var parser = require("./parser.js").parser;
//var parser = require('./grammar.jison').parser;

function Diagram() {
  this.actors  = [];
  this.entries = [];
}
/*
 * Return an existing actor with this alias, or creates a new one with alias and name.
 */
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

/*
 * Parses the input as either a alias, or a "name as alias", and returns the corresponding actor.
 */
// Diagram.prototype.getActorWithAlias = function(input) {
//   input = input.trim();

//   // We are lazy and do some of the parsing in javascript :(. TODO move into the .jison file.
//   var s = /([\s\S]+) as (\S+)$/im.exec(input);
//   var alias;
//   var name;
//   if (s) {
//     name  = s[1].trim();
//     alias = s[2].trim();
//   } else {
//     name = alias = input;
//   }
//   return this.getActor(alias, name);
// };

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
  
  var parameters       = (function() {
    var match = message.match(/^([^\r\n]+)(\-\-\w+\s+)(\#[A-Za-z0-9]+)/);
    if(match && match.length > 1) {
      console.log('color: ' + this.color);
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

// Diagram.Entry.prototype.isSelf = function() {
//   return this.actorA === this.actorB;
// };

Diagram.unescape = function(s) {
  // Turn "\\n" into "\n"
  return s.trim().replace(/^"(.*)"$/m, '$1').replace(/\\n/gm, '\n');
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

// Some older browsers don't have getPrototypeOf, thus we polyfill it
// https://github.com/bramp/js-sequence-diagrams/issues/57
// https://github.com/zaach/jison/issues/194
// Taken from http://ejohn.org/blog/objectgetprototypeof/
// if (typeof Object.getPrototypeOf !== 'function') {
//   /* jshint -W103 */
//   if (typeof 'test'.__proto__ === 'object') {
//     Object.getPrototypeOf = function(object) {
//       return object.__proto__;
//     };
//   } else {
//     Object.getPrototypeOf = function(object) {
//       // May break if the constructor has been tampered with
//       return object.constructor.prototype;
//     };
//   }
//   /* jshint +W103 */
// }

/** The following is included by preprocessor */
// #include "build/grammar.js"

/**
 * jison doesn't have a good exception, so we make one.
 * This is brittle as it depends on jison internals
 */
 function ParseError(message, hash) {
  //_.extend(this, hash);

  this.name = 'ParseError';
  this.message = (message || '');
}
ParseError.prototype = new Error();
Diagram.ParseError = ParseError;

Diagram.parse = function(input) {
  // TODO jison v0.4.17 changed their API slightly, so parser is no longer defined:

  // Create the object to track state and deal with errors
  grammar.yy = new Diagram();
  grammar.yy.parseError = function(message, hash) {
    throw new ParseError(message, hash);
  };

  // Parse
  var diagram = grammar.parse(input);

  // Then clean up the parseError key that a user won't care about
  delete diagram.parseError;
  return diagram;
};