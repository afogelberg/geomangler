var featureStore = require('../stores/featurestore');

module.exports = function getFieldNames(opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var props = features[0].getProperties() || {};
  return  Object.keys(props);
}
