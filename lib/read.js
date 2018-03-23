var ags = require('./formats/ags');
var csv = require('./formats/csv');
var geojson = require('./formats/geojson');
var gml = require('./formats/gml');
var json = require('./formats/json');
var topojson = require('./formats/topojson');
var settings = require('../conf/settings');

var readers = {
  ags: ags().read,
  csv: csv().read,
  gml: gml().read,
  geojson: geojson().read,
  json: json().read,
  topojson: topojson().read
};

module.exports = function add(format, url, opt_options) {
  var options = opt_options || {};
  format = format.toLowerCase();
  return readers[format](url, options);
}
