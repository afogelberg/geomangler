const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function move(deltaX, deltaY, options = {}) {
  const features = options.features || featureStore().getFeatures();

  const movedFeatures = features.map((feature) => {
    feature.getGeometry().translate(deltaX, deltaY);
    return feature;
  });

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', movedFeatures);
  return movedFeatures;
};
