var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function move(deltaX, deltaY, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();

  var movedFeatures = features.map(function(feature) {
    feature.getGeometry().translate(deltaX, deltaY);
    return feature;
  });

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', movedFeatures);
  return movedFeatures;
}
