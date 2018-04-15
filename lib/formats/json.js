const geojson = require('./geojson');
const gml = require('./gml');
const wkt = require('./wkt');
const xy = require('./xy');
const saveToFile = require('../file/jsonfile');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

const geometryFormats = {
  geojson: geojson(),
  gml: gml(),
  wkt: wkt(),
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
  let jsonLayer = {};
  if (format in geometryFormats) {
    jsonLayer = geometryFormats[format].writeJSON(features, options);
  }
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
