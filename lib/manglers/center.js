const featureStore = require('../stores/featurestore');
const Point = require('@ol/geom/point');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

const getCenter = function getCenter(geometry) {
  const type = geometry.getType();
  let center;
  switch (type) {
    case 'Polygon':
      center = geometry.getInteriorPoint().getCoordinates().slice(0, 2);
      break;
    case 'MultiPolygon':
      center = geometry.getInteriorPoints().getFirstCoordinate().slice(0, 2);
      break;
    case 'Point':
      center = geometry.getCoordinates();
      break;
    case 'MultiPoint':
      center = geometry.getPoints()[0].getCoordinates();
      break;
    case 'LineString':
      center = geometry.getCoordinateAt(0.5);
      break;
    case 'MultiLineString':
      center = geometry.getLineStrings()[0].getCoordinateAt(0.5);
      break;
    case 'Circle':
      center = geometry.getCenter();
      break;
    default:
      break;
  }
  return center;
};

module.exports = function center(options = {}) {
  const features = options.features || featureStore().getFeatures();

  const centerFeatures = features.map((feature) => {
    const geometry = feature.getGeometry();
    if (geometry) {
      const centerGeometry = new Point(getCenter(geometry));
      feature.setGeometry(centerGeometry);
    }
    return feature;
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', centerFeatures);
  return centerFeatures;
};
