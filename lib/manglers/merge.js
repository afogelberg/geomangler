var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function merge(featureCollections, opt_options) {
  var options = opt_options || {};
  var features = featureStore().getFeatures() || options.features || [];
  var mergedFeatures = features.concat(featureCollections);

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', mergedFeatures);
  return mergedFeatures;
}
