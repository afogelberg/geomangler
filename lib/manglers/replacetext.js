const featureStore = require('../stores/featurestore');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(val, find, replace) {
  if (val && find.length) {
    return val.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  } else if (find === '' && !val) {
    return replace;
  }
  return val;
}

function replaceStart(val, find, replace) {
  if (val.startsWith(find)) {
    return val.replace(find, replace);
  }
  return val;
}

function replaceByDelimiter(val, find, replace) {
  let index;
  if (val) {
    index = val.indexOf(find);
    if (index) {
      return val.slice(0, index) + replace;
    }
  }
  return val;
}

module.exports = function replaceText(find, replace, options = {}) {
  const type = options.type || 'all';
  const features = options.features || featureStore().getFeatures();
  const fields = options.fields || Object.keys(features[0].getProperties());

  const replaceFunctions = {
    all: replaceAll,
    delimiter: replaceByDelimiter,
    startsWith: replaceStart
  };

  function replaceByType(replaceType) {
    features.forEach((feature) => {
      fields.forEach((field) => {
        const val = feature.get(field);
        const changed = replaceFunctions[replaceType](val, find, replace);
        feature.set(field, changed);
      });
    });
  }

  if (type in replaceFunctions) {
    replaceByType(type);
  }

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
};
