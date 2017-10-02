var Geojson = require('ol/format/geojson');
var olGeojson = new Geojson();
var jsonfile = require('jsonfile');
var createCrs = require('../helpers/createCrs');
var writeJsonFile = require('../writers/writeJsonFile');
var updateFeatureDispacther = require('../dispatchers/updateFeaturesDispatcher')();

module.exports = geojson;

function geojson() {
  return {
    readGeojson: readGeojson,
    writeGeojson: writeGeojson
  }
}

function readGeojson(path) {
  //TODO check if path is url
  var geojsonObject = jsonfile.readFileSync(path);
  var features = olGeojson.readFeatures(geojsonObject);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function writeGeojson(name, features, options) {
  var crs = createCrs(options.epsgCode);
  var geojsonLayer = olGeojson.writeFeaturesObject(features);
  geojsonLayer.crs = crs;
  name += '.geojson';
  writeJsonFile(name, geojsonLayer, options);
  return geojsonLayer;
}
