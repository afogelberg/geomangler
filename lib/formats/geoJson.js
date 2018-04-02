const Geojson = require('@ol/format/geojson');

const olGeojson = new Geojson();
const jsonfile = require('jsonfile');
const createCrs = require('../helpers/createcrs');
const saveToFile = require('../file/jsonfile');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function add(path) {
  const geojsonObject = jsonfile.readFileSync(path);
  const features = olGeojson.readFeatures(geojsonObject);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function read(geojsonInput) {
  const features = olGeojson.readFeatures(geojsonInput);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function write(features, options) {
  const crs = createCrs(options.epsgCode);
  const geojsonLayer = olGeojson.writeFeaturesObject(features);
  geojsonLayer.crs = crs;
  return geojsonLayer;
}

function save(name, features, options) {
  const geojsonLayer = write(features, options);
  name += '.geojson';
  saveToFile(name, geojsonLayer, options);
  return geojsonLayer;
}

function geojson() {
  return {
    add,
    read,
    write,
    save,
  };
}

module.exports = geojson;
