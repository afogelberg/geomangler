var ol = require('openlayers');
var topojson = require('topojson');
var jsonfile = require('jsonfile');
var writeJsonFile = require('../writers/writeJsonFile');
var olGeojson = new ol.format.GeoJSON();
var olTopojson = new ol.format.TopoJSON();

module.exports = TopoJSON;

function TopoJSON() {
  return {
    readTopojson: readTopojson,
    writeTopojson: writeTopojson
  }
}

function readTopojson(path) {
  var topoObject = jsonfile.readFileSync(path);
  var features = olTopojson.readFeatures(topoObject);
  console.log(features);
}

function writeTopojson(name, features, options) {
  //TODO check types
  var geojsonObject = olGeojson.writeFeaturesObject(features);
  var topojsonObject = topojson.topology({foo: geojsonObject}, 1e4);
  name += '.json';
  writeJsonFile(name, topojsonObject, options);
  return topojsonObject;
}
