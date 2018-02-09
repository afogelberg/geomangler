var Geojson = require('ol/format/geojson');
var olGeojson = new Geojson();
var jsonfile = require('jsonfile');
var createCrs = require('../helpers/createcrs');
var saveToFile = require('../file/jsonfile');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = geojson;

function geojson() {
  return {
    add: add,
    read: read,
    write: write,
    save: save
  }
}

function add(path) {
  var geojsonObject = jsonfile.readFileSync(path);
  var features = olGeojson.readFeatures(geojsonObject);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function read(geojsonInput) {
  var features = olGeojson.readFeatures(geojsonInput);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function write(features, options) {
  var crs = createCrs(options.epsgCode);
  var geojsonLayer = olGeojson.writeFeaturesObject(features);
  geojsonLayer.crs = crs;
  return geojsonLayer;
}

function save(name, features, options) {
  var geojsonLayer = write(features, options);
  name += '.geojson';
  saveToFile(name, geojsonLayer, options);
  return geojsonLayer;
}
