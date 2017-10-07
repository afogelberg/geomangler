var Feature = require('ol/feature');
var Wkt = require('ol/format/wkt');

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
  var wkt = new Wkt();
  var geom = wkt.readGeometry(wkt_str);
  return geom;
}

function jsonToFeature(obj) {
  return new Feature(obj);
}
