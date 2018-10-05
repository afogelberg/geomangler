const olFeature = require('@ol/feature');

function readJSON(jsonLayer) {
  return jsonLayer.features.map((jsonFeature) => {
    const feature = new olFeature(jsonFeature);
    return feature;
  });
}

function Feature() {
  return {
    readJSON
  };
}

module.exports = Feature;
