const Feature = require('@ol/feature');
const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function sourceToObj(source, field, isFeature) {
  let geometryName;
  if (isFeature) {
    geometryName = source[0].getGeometryName();
    return source.reduce((obj, feature) => {
      const props = feature.getProperties();
      if (!(props[field] in obj) && props[field]) {
        delete props[geometryName];
        obj[props[field]] = props;
      }
      return obj;
    }, {});
  }
  return source.reduce((obj, jsonFeature) => {
    if (!(jsonFeature[field] in obj) && jsonFeature[field]) {
      obj[jsonFeature[field]] = jsonFeature;
    }
    return obj;
  }, {});
}

module.exports = function joinFeatures(source, field, options = {}) {
  const features = options.features || featureStore().getFeatures();
  const isFeature = source[0] instanceof Feature || false;
  const targetField = options.targetField || field;
  const keepAll = 'keepAll' in options ? options.keepAll : true;
  const sourceObj = sourceToObj(source, field, isFeature);
  const joinedFeatures = [];

  features.forEach((feature) => {
    const val = feature.get(targetField);
    if (val in sourceObj) {
      delete sourceObj[val][field];
      feature.setProperties(sourceObj[val]);
      joinedFeatures.push(feature);
    } else if (keepAll) {
      joinedFeatures.push(feature);
    }
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', joinedFeatures);
  return joinedFeatures;
};
