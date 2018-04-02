const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function rename(obj, options = {}) {
  const features = options.features || featureStore().getFeatures();
  const props = Object.keys(obj);
  props.forEach((prop) => {
    features.forEach((feature) => {
      feature.set(prop, feature.get(obj[prop]));
      feature.unset(obj[prop]);
    });
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
};
