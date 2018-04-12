const ags = require('./formats/ags');
const csv = require('./formats/csv');
const geojson = require('./formats/geojson');
const gml = require('./formats/gml');
const pg = require('./formats/pg');
const topojson = require('./formats/topojson');

const readers = {
  ags: ags().add,
  csv: csv().read,
  gml: gml().add,
  geojson: geojson().add,
  pg: pg().add,
  topojson: topojson().add
};

module.exports = function add(format, url, options = {}) {
  format = format.toLowerCase();
  return readers[format](url, options);
};
