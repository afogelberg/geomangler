var ol = require('openlayers');

var layerNameAttribute = 'Typ';

module.exports = function(jsonFeatures) {
  var geojsonLayers;
  var features = jsonFeatures.map(function(jsonFeature) {
    jsonFeature.geometry = wktToOlGeometry(jsonFeature.geometry);
    return jsonToFeature(jsonFeature);
  });
  return features;
}

function wktToOlGeometry(wkt_str) {
  var wkt = new ol.format.WKT();
  var geom = wkt.readGeometry(wkt_str);
  return geom;
}

function jsonToFeature(obj) {
  return new ol.Feature(obj);
}
