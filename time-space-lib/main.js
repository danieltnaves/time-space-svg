(function() {
'use strict';

// The following are included by preprocessor */
// #include "build/space-time.js"

// Taken from underscore.js:
// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
// We use `self` instead of `window` for `WebWorker` support.
var root = (typeof self == 'object' && self.self == self && self) ||
 (typeof global == 'object' && global.global == global && global);

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = SpaceTime;
  }
  exports.SpaceTime = SpaceTime;
  module.exports.SpaceTime = SpaceTime;
} else {
  root.SpaceTime = SpaceTime;
  window.SpaceTime = SpaceTime;
}
}());
