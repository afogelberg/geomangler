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

function wkt() {
  return {
    readJSON
  };
}

module.exports = wkt;
