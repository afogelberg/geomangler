var updateFeatureDispacther = require('../dispatchers/updateFeaturesDispatcher')();
var storedFeatures = undefined;
var mounted = false;

module.exports = featureStore;

function featureStore() {

  if (!mounted) {
    mount();
    mounted = true;
  }

  return {
    getFeatures: getFeatures
  }
}

function mount() {
  updateFeatureDispacther.getEventEmitter().on('updateFeatures', setFeatures);
}

function getFeatures() {
  return storedFeatures;
}

function setFeatures(data) {
  // console.log(features);
  storedFeatures = data.features;
}
