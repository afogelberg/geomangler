const featureStore = require('../stores/featurestore');

module.exports = function getFieldNames(options = {}) {
  const features = options.features || featureStore().getFeatures();
  const props = features[0].getProperties() || {};
  return Object.keys(props);
};
