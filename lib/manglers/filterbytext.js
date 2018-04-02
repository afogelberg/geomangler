const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function filterByText(find, options = {}) {
  const exclude = 'exclude' in options ? options.exclude : false;
  const caseSensitive = 'caseSensitive' in options ? options.caseSensitive : true;
  const features = options.features || featureStore().getFeatures();
  const fields = options.fields || Object.keys(features[0].getProperties());

  function findText(val) {
    if (val || val === '') {
      if (!caseSensitive) {
        val = val.toLowerCase();
      }
      if (val.indexOf(find) !== -1) {
        return true;
      }
    }
    return false;
  }

  function filter() {
    return features.filter((feature) => {
      let match = false;
      fields.forEach((field) => {
        const val = feature.get(field);
        if (findText(val)) {
          match = true;
        }
      });
      if (match && !exclude) {
        return feature;
      } else if (!match && exclude) {
        return feature;
      }
    });
  }

  if (!caseSensitive) {
    find = find.toLowerCase();
  }
  const filtered = filter(find);

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', filtered);
  return filtered;
};
