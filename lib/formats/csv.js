var Feature = require('@ol/feature');
var fs = require('fs');
var csvjson = require('csvjson');
var json2csv = require('json2csv');
var csvFile = require('../file/csvfile');

module.exports = csv;

function csv() {
  return {
    read: read,
    save: save,
    write: write
  }
}

function read(path, opt_options) {
  var options = opt_options || {};
  var data = fs.readFileSync(path, {
    encoding: 'utf8'
  });
  var schema = 'schema' in options ? options.schema : true;
  var delimiter = options.delimiter || ',';
  var csvOptions = {
    delimiter: delimiter,
    quote: options.quote || '"'
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

function write(features, options) {
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
    var csvFeatures = writeCsvFeatures(jsonFeatures, options);
    return csvFeatures;
  }
}

function writeCsvFeatures(jsonFeatures, options) {
  var csvOptions = {
    data: jsonFeatures,
    withBOM: true,
    del: options.delimiter || ','
  };
  if (options.fields) {
    csvOptions.fields = options.fields;
  }
  return json2csv(csvOptions);
}

function save(name, features, options) {
  var csvFeatures = write(features, options);
  csvFile(name, csvFeatures, options);
  return csvFeatures;
}
