var gml = require('./gml');
var jsonfile = require('jsonfile');
var saveToFile = require('../file/jsonfile');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

var geometryFormats = {
  gml: gml()
};

module.exports = json;

function json() {
  return {
    read: read,
    write: write,
    save: save
  }
}

function read(geometryFormat, jsonFeatures, opt_options) {
  var options = opt_options || {};
  var format = geometryFormat.toLowerCase();
  var features = [];
  if (format in geometryFormats) {
    features = geometryFormats[format].readJSON(jsonFeatures, options);
  }
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function write(features, options) {
  var geometryFormat = options.geometryFormat || 'geojson';
  var format = options.geometryFormat.toLowerCase();
  var jsonLayer = {};
  var jsonFeatures = [];
  if (format in geometryFormats) {
    jsonFeatures = geometryFormats[format].writeJSON(features, options);
  }
  jsonLayer.epsgCode = options.epsgCode;
  jsonLayer.features = jsonFeatures;
  return jsonLayer;
}

function save(name, features, options) {
  var jsonLayer = write(features, options);
  name += '.json';
  saveToFile(name, jsonLayer, options);
  return jsonLayer;
}
