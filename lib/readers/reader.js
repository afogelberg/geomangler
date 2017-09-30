var geoJson = require('../formats/geoJson');
var topoJson = require('../formats/topoJson');
var csv = require('../formats/csv');

module.exports = {
  geojson: geoJson().readGeojson,
  topojson: topoJson().readTopojson,
  csv: csv().readCsv
}
