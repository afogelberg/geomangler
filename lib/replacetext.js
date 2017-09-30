var featureStore = require('./stores/featureStore');
var updateFeatureDispacther = require('./dispatchers/updateFeaturesDispatcher')();

module.exports = function replaceText(find, replace, opt_options) {
  var options = opt_options || {};
  var type = options.type || 'all';
  var features = options.features || featureStore().getFeatures();
  var fields = options.fields || Object.keys(features[0].getProperties());
  var replaceFunctions = {
    all: replaceAll,
    delimiter: replaceByDelimiter
  };

  if (type in replaceFunctions) {
    replaceByType(type);
  }

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;

  function replaceByType(replaceType) {
    features.forEach(function(feature) {
      fields.forEach(function(field) {
        var val = feature.get(field);
        var changed = replaceFunctions[replaceType](val, find, replace);
        feature.set(field, changed);
      });
    });
  }

  function replaceByDelimiter(val, find, replace) {
    var index;
    if (val) {
      index = val.indexOf(find);
      if (index) {
        return val.slice(0, index) + replace;
      }
    }
    return val;
  }

  function replaceAll(val, find, replace) {
    if (val && find.length) {
      return val.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    } else if (find === '' && !val) {
      return replace;
    } else {
      return val
    }
  }

  function escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
}
