var manglers = require('./lib/manglers');
var helpers = require('./lib/helpers/helpers');

module.exports = function() {
  return Object.assign({}, manglers, helpers);
}();
