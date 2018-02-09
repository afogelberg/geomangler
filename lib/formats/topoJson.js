var Geojson = require('ol/format/geojson');
var Topojson = require('ol/format/topojson');
var topojson = require('topojson');
var jsonfile = require('jsonfile');
var saveToFile = require('../file/jsonfile');
var olGeojson = new Geojson();
var olTopojson = new TopoJSON();

module.exports = TopoJSON;

function TopoJSON() {
  return {
    add: add,
    read: read,
    save: save,
    write: write
  };
}

function add(path) {
  var topoObject = jsonfile.readFileSync(path);
  var features = olTopojson.readFeatures(topoObject);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function read(topojsonInput) {
  var features = olTopojson.readFeatures(topojsonInput);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function write(features, options) {
  var geojsonObject = olGeojson.writeFeaturesObject(features);
  var topojsonObject = topojson.topology({foo: geojsonObject}, 1e4);
  return topojsonObject;
}

function save(name, features, options) {
  var topojsonObject = write(features, options);
  name += '.json';
  saveToFile(name, topojsonObject, options);
  return topojsonObject;
}
