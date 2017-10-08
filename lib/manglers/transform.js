var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function transform(source, destination, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();

  var transformed = features.map(function(feature) {
    feature.getGeometry().transform(source, destination);
    return feature;
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', transformed);
  return transformed;
}
