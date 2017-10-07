var featureStore = require('./stores/featurestore')();
var writer = require('./writers/writer');
var settings = require('../conf/settings');

module.exports = save;

function save(format, name, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore.getFeatures();
  options.epsgCode = options.epsgCode || 'EPSG:4326';
  format = format.toLowerCase();
  return writer[format](name, features, options);
}
