const featureStore = require('../stores/featurestore');

module.exports = function getUniqueValues(prop, options = {}) {
  const features = options.features || featureStore().getFeatures();
  const vals = [];
  const nullValue = options.nullValue || null;
  const includeEmpty = 'includeEmpty' in options ? options.includeEmpty : true;
  features.forEach((feature) => {
    const val = feature.get(prop) || nullValue;
    const include = includeEmpty || (val || false);
    if (vals.indexOf(val) === -1 && include) {
      vals.push(val);
    }
  });
  return vals;
};
