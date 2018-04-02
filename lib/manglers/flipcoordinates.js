const flip = require('../utils/flipcoordinates');
const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function flipCoordinates(options = {}) {
  const features = options.features || featureStore().getFeatures();

  const flipped = flip(features);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', flipped);
  return flipped;
};
