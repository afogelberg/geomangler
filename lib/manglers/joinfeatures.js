const Feature = require('@ol/feature');
const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function sourceToObj(options) {
  const {
    source,
    field,
    isFeature
  } = options;

  if (isFeature) {
    return source.reduce((obj, feature) => {
      const props = feature.getProperties();
      if (!(props[field] in obj) && props[field]) {
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

const isFeatureLayer = function isFeatureLayer(layer) {
  const isFeature = layer[0] instanceof Feature || false;
  return isFeature;
};

const getGeometryName = function getGeometryName(layer) {
  if (isFeatureLayer) {
    return layer[0].getGeometryName();
  }
  return false;
};

module.exports = function joinFeatures(source, field, options = {}) {
  const features = options.features || featureStore().getFeatures();
  const targetField = options.targetField || field;
  const keepAll = 'keepAll' in options ? options.keepAll : true;
  const geometrySource = options.geometrySource || 'target';
  const sourceGeometryName = getGeometryName(source);
  const targetGeometryName = getGeometryName(features);

  const sourceObj = sourceToObj({
    source,
    field,
    isFeature: isFeatureLayer(source)
  });

  const joinedFeatures = [];
  features.forEach((feature) => {
    const idValue = feature.get(targetField);
    if (idValue in sourceObj) {
      delete sourceObj[idValue][field];
      if (geometrySource === 'target' && targetGeometryName && sourceGeometryName) {
        delete sourceObj[idValue][sourceGeometryName];
      } else if (geometrySource === 'source' && sourceGeometryName && targetGeometryName) {
        const geometry = sourceObj[idValue][sourceGeometryName];
        feature.setGeometry(geometry);
        delete sourceObj[idValue][sourceGeometryName];
      }
      feature.setProperties(sourceObj[idValue]);
      joinedFeatures.push(feature);
    } else if (keepAll) {
      joinedFeatures.push(feature);
    }
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', joinedFeatures);
  return joinedFeatures;
};
