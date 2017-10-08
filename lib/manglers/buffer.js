var Circle = require('ol/geom/circle');
var Polygon = require('ol/geom/polygon');
var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function buffer(radius, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var type = options.type || 'circle';
  var sides = options.sides || 64;
  var angle = options.angle || 0;
  var bufferFunctions = {
    circle: createCircle,
    square: createSquare
  };

  var bufferFeatures = features.map(function(feature) {
    var coord = feature.getGeometry().getCoordinates();
    feature.setGeometry(bufferFunctions[type](coord, radius, sides))
    return feature;
  });

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', bufferFeatures);
  return bufferFeatures;
}

function createSquare(coordinate, radius) {
  var extent = new Circle(coordinate, radius).getExtent();
  return new Polygon.fromExtent(extent);
}

function createCircle(coordinate, radius, sides, angle) {
  var circle = new Circle(coordinate, radius);
  return new Polygon.fromCircle(circle, sides, angle);
}
