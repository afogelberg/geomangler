var events = require('events');
var eventEmitter = new events.EventEmitter();

var updateFeatureDispacther = function() {
  return {
    dispatchUpdateFeature: dispatchUpdateFeature,
    getEventEmitter: getEventEmitter
  }
}

function dispatchUpdateFeature(type, features) {
  e = {
    features: features
  };
  eventEmitter.emit('updateFeatures', e);
}

function getEventEmitter() {
  return eventEmitter;
}

module.exports = updateFeatureDispacther;
