const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function merge(featureCollections, options = {}) {
  const features = featureStore().getFeatures() || options.features || [];
  const mergedFeatures = features.concat(featureCollections);

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', mergedFeatures);
  return mergedFeatures;
};
