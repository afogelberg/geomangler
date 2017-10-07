var Feature = require('ol/feature');
var fs = require('fs');
var csvjson = require('csvjson');
var writeCsvFile = require('../writers/writeCsvFile');

module.exports = csv;

function csv() {
  return {
    readCsv: readCsv,
    writeCsv: writeCsv
  }
}

function readCsv(path, opt_options) {
  var options = opt_options || {};
  var data = fs.readFileSync(path, {
    encoding : 'utf8'
  });
  var schema = 'schema' in options ? options.schema : true;
  var delimiter = options.delimiter || ',';
  var csvOptions = {
    delimiter : delimiter,
    quote     : options.quote || '"'
  };
  if (options.fields) {
    csvOptions.headers = options.fields.join(delimiter);
  }
  if (schema) {
    return csvjson.toSchemaObject(data, csvOptions);
  } else {
    return csvjson.toObject(data, csvOptions);
  }
}

function writeCsv(name, features, options) {
  if (features.length) {
    var isFeature = features[0] instanceof Feature ? true : false;
    var jsonFeatures;
    if (isFeature) {
      jsonFeatures = features.map(function(feature) {
        var props = feature.getProperties();
        delete props['geometry'];
        return props;
      });
    } else {
      jsonFeatures = features;
    }
    name += '.csv';
    writeCsvFile(name, jsonFeatures, options);
  }
}
