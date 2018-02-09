var flip = require('../utils/flipcoordinates');
var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function flipCoordinates(opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();

  var flipped = flip(features);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', flipped);
  return flipped;
}
