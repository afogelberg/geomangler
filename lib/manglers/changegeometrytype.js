const MultiPolygon = require('@ol/geom/multipolygon');
const MultiLineString = require('@ol/geom/multilinestring');
const MultiPoint = require('@ol/geom/multipoint');
const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function multipolygon2polygon(feature) {
  const features = [];
  const geometry = feature.getGeometry();
  let polygons;
  if (geometry instanceof MultiPolygon) {
    polygons = geometry.getPolygons();
    polygons.forEach((polygon) => {
      const cloned = feature.clone();
      const coordinates = polygon.getCoordinates();
      polygon.setCoordinates(coordinates, 'XY');
      cloned.setGeometry(polygon);
      features.push(cloned);
    });
    return features;
  }
  return [feature];
}

function multiline2line(feature) {
  const features = [];
  const geometry = feature.getGeometry();
  let lines;
  if (geometry instanceof MultiLineString) {
    lines = geometry.getLineStrings();
    lines.forEach((line) => {
      const cloned = feature.clone();
      const coordinates = line.getCoordinates();
      line.setCoordinates(coordinates, 'XY');
      cloned.setGeometry(line);
      features.push(cloned);
    });
    return features;
  }
  return [feature];
}

function multipoint2point(feature) {
  const features = [];
  const geometry = feature.getGeometry();
  let points;
  if (geometry instanceof MultiPoint) {
    points = geometry.getPoints();
    points.forEach((point) => {
      const cloned = feature.clone();
      const coordinates = point.getCoordinates();
      point.setCoordinates(coordinates, 'XY');
      cloned.setGeometry(point);
      features.push(cloned);
    });
    return features;
  }
  return [feature];
}

const geomtryFunctions = {
  multipolygon2polygon,
  multiline2line,
  multipoint2point,
};

function changeGeometryByType(features, type) {
  let changed = [];
  features.forEach((feature) => {
    const changedFeature = geomtryFunctions[type](feature);
    changed = changed.concat(changedFeature);
  });
  return changed;
}

module.exports = function changeGeometryType(source, destination, options = {}) {
  const features = options.features || featureStore().getFeatures();
  const type = `${source.toLowerCase()}2${destination.toLowerCase()}`;

  const errorMsg = `Sorry, ${source} to ${destination} is currently not supported`;
  let changedFeatures = [];

  if (type in geomtryFunctions) {
    changedFeatures = changeGeometryByType(features, type);
  } else {
    console.log(errorMsg);
    return features;
  }

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', changedFeatures);
  return changedFeatures;
};
