global.window = {};
global.navigator = {
  userAgent: ''
};
var init = require('./lib/init');
var manglers = require('./lib/manglers');
var helpers = require('./lib/helpers');
var file = require('./lib/file');

module.exports = function(opt_options) {
  var options = opt_options || {};
  init(options);
  return Object.assign({}, file, manglers, helpers);
}();
