const featureStore = require('./stores/featurestore')();
const geojson = require('./formats/geojson');
const json = require('./formats/json');
const topojson = require('./formats/topojson');
const csv = require('./formats/csv');

const savers = {
  csv: csv().save,
  geojson: geojson().save,
  json: json().save,
  topojson: topojson().save,
};

const save = function save(format, name, options = {}) {
  const features = options.features || featureStore.getFeatures();
  options.epsgCode = options.epsgCode || 'EPSG:4326';
  format = format.toLowerCase();
  return savers[format](name, features, options);
};

module.exports = save;
