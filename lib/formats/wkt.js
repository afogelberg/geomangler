const Feature = require('@ol/feature');
const WKT = require('@ol/format/wkt');

const olWKT = new WKT();

function readJSON(jsonLayer, options) {
  const geometryName = options.geometryName || 'geometry';
  return jsonLayer.features.map((jsonFeature) => {
    const geometry = jsonFeature[geometryName];
    delete jsonFeature[geometryName];
    const feature = new Feature(jsonFeature);
    feature.setGeometry(olWKT.readGeometry(geometry));
    return feature;
  });
}

function writeJSON(features, options) {
  const jsonLayer = {};
  const geometryName = options.geometryName || 'geom';
  const jsonFeatures = features.map((feature) => {
    const geometry = olWKT.writeGeometry(feature.getGeometry());
    const featureGeometryName = feature.getGeometryName();
    const jsonFeature = feature.getProperties();
    delete jsonFeature[featureGeometryName];
    jsonFeature[geometryName] = geometry;
    return jsonFeature;
  });
  jsonLayer.epsgCode = options.epsgCode;
  jsonLayer.features = jsonFeatures;
  return jsonLayer;
}

function wkt() {
  return {
    readJSON,
    writeJSON
  };
}

module.exports = wkt;
