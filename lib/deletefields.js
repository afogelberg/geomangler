var Feature = require('ol/feature');
var featureStore = require('./stores/featureStore');
var updateFeatureDispacther = require('./dispatchers/updateFeaturesDispatcher')();

module.exports = deleteFields;

function deleteFields(fields) {
  var features = featureStore().getFeatures();
  var renamedFeatures = features.map(createFeatures);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', renamedFeatures);
  return renamedFeatures;

  function createFeatures(feature) {
    var props = feature.getProperties();
    var geometry = feature.getGeometry();
    fields.forEach(function(field) {
      if (props.hasOwnProperty(field)) {
        delete props[field];
      }
    });
    var featureObject = props;
    featureObject.geometry = geometry;
    return new Feature(featureObject);
  }
}
