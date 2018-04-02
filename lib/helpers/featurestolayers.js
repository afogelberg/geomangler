module.exports = function featuresToLayers(features, layerNameAttribute) {
  const layerObject = {};
  features.forEach((feature) => {
    const layerName = feature.get(layerNameAttribute);
    if ('layerName' in layerObject) {
      layerObject[layerName].push(feature);
    } else {
      layerObject[layerName] = [];
      layerObject[layerName].push(feature);
    }
  });
  return layerObject;
};
