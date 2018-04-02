const Geojson = require('@ol/format/geojson');
const Topojson = require('@ol/format/topojson');
const topojson = require('topojson');
const jsonfile = require('jsonfile');
const saveToFile = require('../file/jsonfile');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

const olGeojson = new Geojson();
const olTopojson = new Topojson();

function add(path) {
  const topoObject = jsonfile.readFileSync(path);
  const features = olTopojson.readFeatures(topoObject);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function read(topojsonInput) {
  const features = olTopojson.readFeatures(topojsonInput);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function write(features) {
  const geojsonObject = olGeojson.writeFeaturesObject(features);
  const topojsonObject = topojson.topology({ foo: geojsonObject }, 1e4);
  return topojsonObject;
}

function save(name, features, options) {
  const topojsonObject = write(features, options);
  name += '.json';
  saveToFile(name, topojsonObject, options);
  return topojsonObject;
}

function TopoJSON() {
  return {
    add,
    read,
    save,
    write,
  };
}

module.exports = TopoJSON;
