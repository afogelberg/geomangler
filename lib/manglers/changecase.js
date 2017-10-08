var featureStore = require('../stores/featurestore');
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = function changeCase(type, opt_options) {
  var options = opt_options || {};
  var delimeter = options.delimeter || ' ';
  var features = options.features || featureStore().getFeatures();
  var fields = options.fields || Object.keys(features[0].getProperties());
  var caseFunctions = {
    title: title,
    upperLast: upperLast
  };

  if (type in caseFunctions) {
    changeCaseByType(type);
  }

  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;

  function changeCaseByType(caseType) {
    features.forEach(function(feature) {
      fields.forEach(function(field) {
        var val = feature.get(field);
        var changed = caseFunctions[caseType](val);
        feature.set(field, changed);
      });
    });
  }

  function title(val) {
    if (val) {
      return val.split(delimeter).map(function(part) {
        part = part.toLowerCase();
        return (part.charAt(0).toUpperCase() + part.slice(1));
      }).join(delimeter);
    } else {
      return val;
    }
  }

  function upperLast(val) {
    if (val) {
      var length = val.length;
      var first = '';
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
}

function hasNumber(str) {
  return /\d/.test(str);
}
