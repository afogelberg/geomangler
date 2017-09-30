var ol = require('openlayers');
var featureStore = require('./stores/featureStore');
var updateFeatureDispacther = require('./dispatchers/updateFeaturesDispatcher')();

module.exports = function joinFeatures(source, field, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var isFeature = source[0] instanceof ol.Feature ? true : false;
  var targetField = options.targetField || field;
  var sourceObj = sourceToObj(source, field, isFeature);

  features.forEach(function(feature) {
    var val = feature.get(targetField);
    if (val in sourceObj) {
      delete sourceObj[val][field];
      feature.setProperties(sourceObj[val]);
    }
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function sourceToObj(source, field, isFeature) {
  var geometryName;
  if (isFeature) {
    geometryName = source[0].getGeometryName();
    return source.reduce(function(obj, feature) {
      var props = feature.getProperties();
      if (!(props[field] in obj) && props[field]) {
        delete props[geometryName];
        obj[props[field]] = props;
      }
      return obj;
    }, {});
  } else {
    return source.reduce(function(obj, jsonFeature) {
      if (!(jsonFeature[field] in obj) && jsonFeature[field]) {
        obj[jsonFeature[field]] = jsonFeature;
      }
      return obj;
    }, {});
  }
}
