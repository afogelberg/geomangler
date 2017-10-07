var Geojson = require('ol/format/geojson');
var Topojson = require('ol/format/topojson');
var topojson = require('topojson');
var jsonfile = require('jsonfile');
var writeJsonFile = require('../writers/writejsonfile');
var olGeojson = new Geojson();
var olTopojson = new TopoJSON();

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
}

function writeTopojson(name, features, options) {
  //TODO check types
  var geojsonObject = olGeojson.writeFeaturesObject(features);
  var topojsonObject = topojson.topology({foo: geojsonObject}, 1e4);
  name += '.json';
  writeJsonFile(name, topojsonObject, options);
  return topojsonObject;
}
