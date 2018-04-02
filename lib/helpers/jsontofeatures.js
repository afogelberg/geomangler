const Feature = require('@ol/feature');
const Wkt = require('@ol/format/wkt');

function wktToOlGeometry(wktStr) {
  const wkt = new Wkt();
  const geom = wkt.readGeometry(wktStr);
  return geom;
}

function jsonToFeature(obj) {
  return new Feature(obj);
}

module.exports = function jsonToFeatures(jsonFeatures) {
  const features = jsonFeatures.map((jsonFeature) => {
    jsonFeature.geometry = wktToOlGeometry(jsonFeature.geometry);
    return jsonToFeature(jsonFeature);
  });
  return features;
};
