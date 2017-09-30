var jsonfile = require('jsonfile');
var createCrs = require('./createcrs');

var crs;
var path;

module.exports = function(geojsonLayer, opt_options) {
  var options = opt_options || {};
  var epsgCode = options.epsgCode || 'EPSG:4326';
  crs = createCrs(epsgCode);
  path = options.path || '/';

  var layerNames = Object.getOwnPropertyNames(geojsonLayer);
  layerNames.forEach(function(layerName) {
    var layer = geojsonLayer[layerName];
    writeFile(layerName, layer);
  })
}

function writeFile(layerName, geojsonLayer) {
  var file = path.concat(layerName, '.geojson');
  geojsonLayer.crs = crs;
  jsonfile.writeFile(file, geojsonLayer, {spaces: 2, encoding: 'utf8'}, function (err) {
    // console.error(err);
  });
}
