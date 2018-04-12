const ags = require('./formats/ags');
const csv = require('./formats/csv');
const geojson = require('./formats/geojson');
const gml = require('./formats/gml');
const json = require('./formats/json');
const pg = require('./formats/pg');
const topojson = require('./formats/topojson');

const readers = {
  ags: ags().read,
  csv: csv().read,
  gml: gml().read,
  geojson: geojson().read,
  json: json().read,
  pg: pg().read,
  topojson: topojson().read
};

const add = function add(format, url, options = {}) {
  format = format.toLowerCase();
  return readers[format](url, options);
};

module.exports = add;
