const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

let storedFeatures;
let mounted = false;

function setFeatures(data) {
  storedFeatures = data.features;
}

function mount() {
  updateFeatureDispacther.getEventEmitter().on('updateFeatures', setFeatures);
}

function getFeatures() {
  return storedFeatures;
}

function featureStore() {
  if (!mounted) {
    mount();
    mounted = true;
  }

  return {
    getFeatures
  };
}

module.exports = featureStore;
