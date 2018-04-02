const Feature = require('@ol/feature');
const fs = require('fs');
const csvjson = require('csvjson');
const json2csv = require('json2csv');
const csvFile = require('../file/csvfile');

function read(path, options = {}) {
  const data = fs.readFileSync(path, {
    encoding: 'utf8',
  });
  const schema = 'schema' in options ? options.schema : true;
  const delimiter = options.delimiter || ',';
  const csvOptions = {
    delimiter,
    quote: options.quote || '"',
  };
  if (options.fields) {
    csvOptions.headers = options.fields.join(delimiter);
  }
  if (schema) {
    return csvjson.toSchemaObject(data, csvOptions);
  }
  return csvjson.toObject(data, csvOptions);
}

function writeCsvFeatures(jsonFeatures, options) {
  const csvOptions = {
    data: jsonFeatures,
    withBOM: true,
    del: options.delimiter || ',',
  };
  if (options.fields) {
    csvOptions.fields = options.fields;
  }
  return json2csv(csvOptions);
}

function write(features, options) {
  if (features.length) {
    const isFeature = features[0] instanceof Feature || false;
    let jsonFeatures;
    if (isFeature) {
      jsonFeatures = features.map((feature) => {
        const props = feature.getProperties();
        delete props.geometry;
        return props;
      });
    } else {
      jsonFeatures = features;
    }
    const csvFeatures = writeCsvFeatures(jsonFeatures, options);
    return csvFeatures;
  }
  return [];
}

function save(name, features, options) {
  const csvFeatures = write(features, options);
  csvFile(name, csvFeatures, options);
  return csvFeatures;
}

function csv() {
  return {
    read,
    save,
    write,
  };
}

module.exports = csv;
