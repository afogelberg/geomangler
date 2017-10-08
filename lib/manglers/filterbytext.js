var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function filterByText(find, opt_options) {
  var options = opt_options || {};
  var exclude = 'exclude' in options ? options.exclude : false;
  var caseSensitive = 'caseSensitive' in options ? options.caseSensitive : true;
  var features = options.features || featureStore().getFeatures();
  var fields = options.fields || Object.keys(features[0].getProperties());
  var filtered;
  if (!caseSensitive) {
    find = find.toLowerCase();
  }

  filtered = filter(find);

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', filtered);
  return filtered;

  function filter(find) {
    return features.filter(function(feature) {
      var match = false;
      fields.forEach(function(field) {
        var val = feature.get(field);
        if (findText(val)) {
          match = true;
        };
      });
      if (match && !exclude) {
        return feature;
      } else if (!match && exclude) {
        return feature;
      }
    });
  }

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
}
