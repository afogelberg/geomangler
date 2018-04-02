const Geojson = require('@ol/format/geojson');

const geojson = new Geojson();

module.exports = function layersToGeojson(layerObject, options = {}) {
  const layerNames = Object.getOwnPropertyNames(layerObject);
  const layers = {};
  layerNames.forEach((layerName) => {
    layers[layerName] = geojson.writeFeaturesObject(layerObject[layerName], options);
  });
  return layers;
};
