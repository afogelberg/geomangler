const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function hasNumber(str) {
  return /\d/.test(str);
}

module.exports = function changeCase(type, options = {}) {
  const delimiter = options.delimiter || ' ';
  const features = options.features || featureStore().getFeatures();
  const fields = options.fields || Object.keys(features[0].getProperties());

  function title(val) {
    if (val) {
      return val.split(delimiter).map((part) => {
        part = part.toLowerCase();
        return (part.charAt(0).toUpperCase() + part.slice(1));
      }).join(delimiter);
    }
    return val;
  }

  function upperLast(val) {
    if (val) {
      const {
        length
      } = val.length;
      let first = '';
      if (length > 1 && hasNumber(val)) {
        first = val.slice(0, length - 1);
        return (first + val.charAt(length - 1).toUpperCase());
      }
    }
    return val;
  }

  function lower(val) {
    if (val) {
      if (val.length) {
        return val.toLowerCase();
      }
    }
    return val;
  }

  function upper(val) {
    if (val) {
      if (val.length) {
        return val.toUpperCase();
      }
    }
    return val;
  }

  const caseFunctions = {
    lower,
    title,
    upper,
    upperLast
  };

  function changeCaseByType(caseType) {
    features.forEach((feature) => {
      fields.forEach((field) => {
        const val = feature.get(field);
        const changed = caseFunctions[caseType](val);
        feature.set(field, changed);
      });
    });
  }

  if (type in caseFunctions) {
    changeCaseByType(type);
  }

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
};
