var featureStore = require('../stores/featurestore');
var validator = {};

module.exports = function getUniqueValues(prop, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var vals = [];
  var nullValue = options.nullValue || null;
  var includeEmpty = 'includeEmpty' in options ? includeEmpty : true;
  features.forEach(function(feature) {
    var val = feature.get(prop) || nullValue;
    var include = includeEmpty || val ? true : false;
    if (vals.indexOf(val) === -1 && include) {
      vals.push(val);
    }
  });
  return vals;
}
