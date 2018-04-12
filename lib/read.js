const ags = require('./formats/ags');
const csv = require('./formats/csv');
const geojson = require('./formats/geojson');
const gml = require('./formats/gml');
const json = require('./formats/json');
const mssql = require('./formats/mssql');
const pg = require('./formats/pg');
const topojson = require('./formats/topojson');
const wkt = require('./formats/wkt');

const readers = {
  ags: ags().read,
  csv: csv().read,
  gml: gml().read,
  geojson: geojson().read,
  json: json().read,
  mssql: mssql().read,
  pg: pg().read,
  topojson: topojson().read,
  wkt: wkt().read
};

const add = function add(format, url, options = {}) {
  format = format.toLowerCase();
  return readers[format](url, options);
};

module.exports = add;
