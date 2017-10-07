var featureStore = require('./stores/featurestore');
var updateFeatureDispacther = require('./dispatchers/updatefeaturesdispatcher')();

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
