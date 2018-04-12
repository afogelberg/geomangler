const featureStore = require('./stores/featurestore')();
const geojson = require('./formats/geojson');
const gml = require('./formats/gml');
const json = require('./formats/json');
const topojson = require('./formats/topojson');
const csv = require('./formats/csv');

const writers = {
  geojson: geojson().write,
  gml: gml().write,
  json: json().write,
  topojson: topojson().write,
  csv: csv().write
};

const write = function write(format, options = {}) {
  const features = options.features || featureStore.getFeatures();
  if (!options.epsgCode) options.epsgCode = 'EPSG:4326';
  const writeFormat = format.toLowerCase();
  return writers[writeFormat](features, options);
};

module.exports = write;
