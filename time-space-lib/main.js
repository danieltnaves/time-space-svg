(function() {
'use strict';

// The following are included by preprocessor */
// #include "build/diagram-grammar.js"

// Taken from underscore.js:
// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
// We use `self` instead of `window` for `WebWorker` support.
var root = (typeof self == 'object' && self.self == self && self) ||
 (typeof global == 'object' && global.global == global && global);

// Export the Diagram object for **Node.js**, with
// backwards-compatibility for their old module API. If we're in
// the browser, add `Diagram` as a global object.
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Diagram;
  }
  exports.Diagram = Diagram;
} else {
  root.Diagram = Diagram;
  window.Diagram = Diagram;
}
}());
