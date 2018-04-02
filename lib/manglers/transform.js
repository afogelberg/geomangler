const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function transform(source, destination, options = {}) {
  const features = options.features || featureStore().getFeatures();

  const transformed = features.map((feature) => {
    feature.getGeometry().transform(source, destination);
    return feature;
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', transformed);
  return transformed;
};
