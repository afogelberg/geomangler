var csv = require('../formats/csv');
var geojson = require('../formats/geojson');
var topojson = require('../formats/topojson');

module.exports = {
  csv: csv().readCsv,
  geojson: geojson().readGeojson,
  topojson: topojson().readTopojson
}
