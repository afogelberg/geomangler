var MultiPolygon = require('ol/geom/multipolygon');
var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function changeGeometryType(source, destination, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var type = source.toLowerCase() + '2' + destination.toLowerCase();
  var geomtryFunctions = {
    multipolygon2polygon: multipolygon2polygon
  };
  var errorMsg = 'Sorry, ' + source + ' to ' + destination + ' is currently not supported';
  var changedFeatures = [];

  if (type in geomtryFunctions) {
    changedFeatures = changeGeometryByType(type);
  } else {
    console.log(errorMsg);
    return features;
  }

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', changedFeatures);
  return changedFeatures;

  function changeGeometryByType(type) {
    var changed = [];
    features.forEach(function(feature) {
      var changedFeature = geomtryFunctions[type](feature);
      changed = changed.concat(changedFeature);
    });
    return changed;
  }
}

function multipolygon2polygon(feature) {
  var features = [];
  var geometry = feature.getGeometry();
  var polygons;
  if (geometry instanceof MultiPolygon) {
    polygons = geometry.getPolygons();
    polygons.forEach(function(polygon) {
      var cloned = feature.clone();
      var coordinates = polygon.getCoordinates();
      polygon.setCoordinates(coordinates, 'XY');
      cloned.setGeometry(polygon);
      features.push(cloned);
    });
    return features;
  }
  return [feature];
}
