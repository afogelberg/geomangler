var ags = require('./formats/ags');
var csv = require('./formats/csv');
var geojson = require('./formats/geojson');
var gml = require('./formats/gml');
var topojson = require('./formats/topojson');
var settings = require('../conf/settings');

var readers = {
  ags: ags().add,
  csv: csv().read,
  gml: gml().add,
  geojson: geojson().add,
  topojson: topojson().add
};

module.exports = function add(format, url, opt_options) {
  var options = opt_options || {};
  format = format.toLowerCase();
  return readers[format](url, options);
}
