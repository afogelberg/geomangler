var Feature = require('ol/feature');
var Point = require('ol/geom/point');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function xy() {
  return {
    readJSON: readJSON,
    writeJSON: writeJSON
  }
}

function readJSON(jsonLayer, options) {
  var xField = options.xField || 'x';
  var yField = options.yField || 'y';
  var geometryName = options.geometryName || 'geometry';
  var features = jsonLayer.features.map(function(jsonFeature) {
    var x = jsonFeature[xField];
    var y = jsonFeature[yField];
    var feature = xyToFeature(x, y, geometryName);
    if (geometryName in jsonFeature) {
      delete jsonFeature[geometryName];
    }
    feature.setProperties(jsonFeature);
    return feature;
  });
  return features;
}

function writeJSON(features, options) {
  var jsonLayer = {};
  var xField = options.xField || 'x';
  var yField = options.yField || 'y';
  var jsonFeatures = features.map(function(feature) {
    var geometry = feature.getGeometry().getCoordinates();
    var geometryName = feature.getGeometryName();
    var jsonFeature = feature.getProperties();
    jsonFeature[xField] = geometry[0];
    jsonFeature[yField] = geometry[1];
    delete jsonFeature[geometryName];
    return jsonFeature;
  });
  jsonLayer.epsgCode = options.epsgCode;
  jsonLayer.features = jsonFeatures;
  return jsonLayer;
}

function xyToFeature(x, y, geometryName) {
  var featureOptions = {};
  featureOptions[geometryName] = new Point([x, y]);
  return new Feature(featureOptions);
}

module.exports = xy;
