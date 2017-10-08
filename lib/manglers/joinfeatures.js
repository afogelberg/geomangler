var Feature = require('ol/feature');
var featureStore = require('../stores/featureStore');
var updateFeatureDispacther = require('../dispatchers/updateFeaturesDispatcher')();

module.exports = function joinFeatures(source, field, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var isFeature = source[0] instanceof Feature ? true : false;
  var targetField = options.targetField || field;
  var keepAll = 'keepAll' in options ? options.keepAll : true;
  var sourceObj = sourceToObj(source, field, isFeature);
  var joinedFeatures = [];

  features.forEach(function(feature) {
    var val = feature.get(targetField);
    if (val in sourceObj) {
      delete sourceObj[val][field];
      feature.setProperties(sourceObj[val]);
      joinedFeatures.push(feature);
    } else if (keepAll) {
      joinedFeatures.push(feature);
    }
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', joinedFeatures);
  return joinedFeatures;
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