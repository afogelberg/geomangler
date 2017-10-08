global.window = {};
global.navigator = {
  userAgent: ''
};
var init = require('./lib/init')();
var manglers = require('./lib/manglers');
var helpers = require('./lib/helpers');
var file = require('./lib/file');

module.exports = function() {
  return Object.assign({}, file, manglers, helpers);
}();
