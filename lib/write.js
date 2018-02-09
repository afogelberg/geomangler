var featureStore = require('./stores/featurestore')();
var geojson = require('./formats/geojson');
var gml = require('./formats/gml');
var json = require('./formats/json');
var topojson = require('./formats/topojson');
var csv = require('./formats/csv');
var settings = require('../conf/settings');

var writers = {
  geojson: geojson().write,
  gml: gml().write,
  json: json().write,
  topojson: topojson().write,
  csv: csv().write
};

module.exports = function write(format, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore.getFeatures();
  options.epsgCode = options.epsgCode || 'EPSG:4326';
  format = format.toLowerCase();
  return writers[format](features, options);
}
