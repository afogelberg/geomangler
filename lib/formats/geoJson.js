const Geojson = require('@ol/format/geojson');
const Feature = require('@ol/feature');

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

function readJSON(jsonLayer, options) {
  const geometryName = options.geometryName || 'geom';
  return jsonLayer.features.map((jsonFeature) => {
    const geometry = jsonFeature[geometryName];
    delete jsonFeature[geometryName];
    const feature = new Feature(jsonFeature);
    feature.setGeometry(olGeojson.readGeometry(geometry));
    return feature;
  });
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
    readJSON,
    write,
    save
  };
}

module.exports = geojson;
