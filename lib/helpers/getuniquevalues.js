var featureStore = require('../stores/featureStore');
var validator = {};

module.exports = function getUniqueValues(prop, opt_options) {
  var options = opt_options || {};
  var features = options.features || featureStore().getFeatures();
  var vals = [];
  var nullValue = options.nullValue || null;
  features.forEach(function(feature) {
    var val = feature.get(prop) || nullValue;
    if (vals.indexOf(val) === -1) {
      vals.push(val);
    }
  });
  return vals;
}
