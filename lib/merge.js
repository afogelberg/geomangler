var featureStore = require('./stores/featureStore');
var updateFeatureDispacther = require('./dispatchers/updateFeaturesDispatcher')();

module.exports = function merge(featureCollections, opt_options) {
  var options = opt_options || {};
  var features = featureStore().getFeatures() || options.features || [];
  var mergedFeatures = features.concat(featureCollections);

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', mergedFeatures);
  return mergedFeatures;
}
