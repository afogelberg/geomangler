const geojson = require('./geojson');
const gml = require('./gml');
const xy = require('./xy');
const saveToFile = require('../file/jsonfile');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

const geometryFormats = {
  geojson: geojson(),
  gml: gml(),
  xy: xy()
};

function read(jsonLayer, options = {}) {
  let geometryFormat = options.geometryFormat || 'gml';
  geometryFormat = geometryFormat.toLowerCase();
  let features = [];
  if (geometryFormat in geometryFormats) {
    features = geometryFormats[geometryFormat].readJSON(jsonLayer, options);
  }
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function write(features, options) {
  const format = options.geometryFormat.toLowerCase();
  const jsonLayer = {};
  let jsonFeatures = [];
  if (format in geometryFormats) {
    jsonFeatures = geometryFormats[format].writeJSON(features, options);
  }
  jsonLayer.epsgCode = options.epsgCode;
  jsonLayer.features = jsonFeatures;
  return jsonLayer;
}

function save(name, features, options) {
  const jsonLayer = write(features, options);
  name += '.json';
  saveToFile(name, jsonLayer, options);
  return jsonLayer;
}

function json() {
  return {
    read,
    write,
    save
  };
}

module.exports = json;
