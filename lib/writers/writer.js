var geojson = require('../formats/geojson');
var topojson = require('../formats/topojson');
var csv = require('../formats/csv');

module.exports = {
  geojson: geojson().writeGeojson,
  topojson: topojson().writeTopojson,
  csv: csv().writeCsv
}
