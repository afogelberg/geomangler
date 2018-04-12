const Circle = require('@ol/geom/circle');
const Polygon = require('@ol/geom/polygon');
const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function createSquare(coordinate, radius) {
  const extent = new Circle(coordinate, radius).getExtent();
  return new Polygon.fromExtent(extent);
}

function createCircle(coordinate, radius, sides, angle) {
  const circle = new Circle(coordinate, radius);
  return new Polygon.fromCircle(circle, sides, angle);
}

module.exports = function buffer(radius, options = {}) {
  const features = options.features || featureStore().getFeatures();
  const type = options.type || 'circle';
  const sides = options.sides || 64;
  const bufferFunctions = {
    circle: createCircle,
    square: createSquare
  };

  const bufferFeatures = features.map((feature) => {
    const coord = feature.getGeometry().getCoordinates();
    feature.setGeometry(bufferFunctions[type](coord, radius, sides));
    return feature;
  });

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', bufferFeatures);
  return bufferFeatures;
};
