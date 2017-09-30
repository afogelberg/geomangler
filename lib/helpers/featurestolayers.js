module.exports = function(features, layerNameAttribute) {
  var layerObject = {};
  features.forEach(function(feature) {
    var layerName = feature.get(layerNameAttribute);
    if (layerObject.hasOwnProperty(layerName)) {
      layerObject[layerName].push(feature);
    } else {
      layerObject[layerName] = [];
      layerObject[layerName].push(feature);
    }
  });
  return layerObject;
}
