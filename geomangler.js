global.window = {};
global.navigator = {
  userAgent: ''
};
const init = require('./lib/init');
const manglers = require('./lib/manglers');
const helpers = require('./lib/helpers');
const file = require('./lib/file');
const server = require('./server/server');

module.exports = function(opt_options) {
  const options = opt_options || {};
  init(options);
  let geomangler = Object.assign({}, file, manglers, helpers);
  geomangler.server = server;
  return geomangler;
}();
