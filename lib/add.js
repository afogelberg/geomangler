var reader = require('./readers/reader');
var settings = require('../conf/settings');

module.exports = read;

function read(format, url, opt_options) {
  var options = opt_options || {};
  format = format.toLowerCase();
  return reader[format](url, options);
}
