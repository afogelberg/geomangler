var ol = require('openlayers');
var featureStore = require('./stores/featureStore');
var updateFeatureDispacther = require('./dispatchers/updateFeaturesDispatcher')();

module.exports = function rename(obj, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var props = Object.keys(obj);
  props.forEach(function(prop) {
    features.forEach(function(feature) {
      feature.set(prop, feature.get(obj[prop]));
      feature.unset(obj[prop]);
    });
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}
