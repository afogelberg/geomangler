const Feature = require('@ol/feature');
const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function deleteFields(fields, options = {}) {
  const features = options.features || featureStore().getFeatures();

  function createFeatures(feature) {
    const props = feature.getProperties();
    const geometry = feature.getGeometry();
    fields.forEach((field) => {
      if (field in props) {
        delete props[field];
      }
    });
    const featureObject = props;
    featureObject.geometry = geometry;
    return new Feature(featureObject);
  }

  const renamedFeatures = features.map(createFeatures);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', renamedFeatures);
  return renamedFeatures;
}

module.exports = deleteFields;
