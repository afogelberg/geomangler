const Feature = require('@ol/feature');
const Point = require('@ol/geom/point');

function xyToFeature(x, y, geometryName) {
  const featureOptions = {};
  featureOptions[geometryName] = new Point([x, y]);
  return new Feature(featureOptions);
}

function readJSON(jsonLayer, options) {
  const xField = options.xField || 'x';
  const yField = options.yField || 'y';
  const geometryName = options.geometryName || 'geometry';
  const features = jsonLayer.features.map((jsonFeature) => {
    const x = jsonFeature[xField];
    const y = jsonFeature[yField];
    const feature = xyToFeature(x, y, geometryName);
    if (geometryName in jsonFeature) {
      delete jsonFeature[geometryName];
    }
    feature.setProperties(jsonFeature);
    return feature;
  });
  return features;
}

function writeJSON(features, options) {
  const jsonLayer = {};
  const xField = options.xField || 'x';
  const yField = options.yField || 'y';
  const jsonFeatures = features.map((feature) => {
    const geometry = feature.getGeometry().getCoordinates();
    const geometryName = feature.getGeometryName();
    const jsonFeature = feature.getProperties();
    jsonFeature[xField] = geometry[0];
    jsonFeature[yField] = geometry[1];
    delete jsonFeature[geometryName];
    return jsonFeature;
  });
  jsonLayer.epsgCode = options.epsgCode;
  jsonLayer.features = jsonFeatures;
  return jsonLayer;
}

function xy() {
  return {
    readJSON,
    writeJSON,
  };
}

module.exports = xy;
