var Geojson = require('@ol/format/geojson');
var geojson = new Geojson();

module.exports = function(layerObject, options_opt) {
  var options = options_opt || {};
  var layerNames = Object.getOwnPropertyNames(layerObject);
  var layers = {};
  layerNames.forEach(function(layerName) {
    layers[layerName] = geojson.writeFeaturesObject(layerObject[layerName], options);
  });
  return layers;
}
