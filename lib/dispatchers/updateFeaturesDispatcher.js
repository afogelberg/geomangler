const events = require('events');

const eventEmitter = new events.EventEmitter();

function dispatchUpdateFeature(type, features) {
  const e = {
    features,
  };
  eventEmitter.emit('updateFeatures', e);
}

function getEventEmitter() {
  return eventEmitter;
}

const updateFeatureDispacther = function updateFeatureDispacther() {
  return {
    dispatchUpdateFeature,
    getEventEmitter,
  };
};

module.exports = updateFeatureDispacther;
