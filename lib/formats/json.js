const Geojson = require('./geojson');
const Feature = require('./feature');
const Gml = require('./gml');
const Wkt = require('./wkt');
const XY = require('./xy');
const saveToFile = require('../file/jsonfile');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

const geometryFormats = {
  feature: Feature(),
  geojson: Geojson(),
  gml: Gml(),
  wkt: Wkt(),
  xy: XY()
};

function read(jsonLayer, options = {}) {
  const geometryFormat = options.geometryFormat ? options.geometryFormat.toLowerCase() : null;
  let features = [];
  if (geometryFormat && geometryFormat in geometryFormats) {
    features = geometryFormats[geometryFormat].readJSON(jsonLayer, options);
  }
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

function add(jsonLayer, options = {}) {
  const features = read(jsonLayer, options);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function save(name, features, options) {
  const jsonLayer = write(features, options);
  name += '.json';
  saveToFile(name, jsonLayer, options);
  return jsonLayer;
}

function json() {
  return {
    add,
    read,
    write,
    save
  };
}

module.exports = json;
