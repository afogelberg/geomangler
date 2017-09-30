var json2csv = require('json2csv');
var fs = require('fs');

module.exports = function(name, jsonFeatures, options) {
  var file = options.path.concat(name);
  var csv;
  var csvOptions = {
    data: jsonFeatures,
    withBOM: true,
    del: options.delimiter || ','
  };
  if (options.fields) {
    csvOptions.fields = options.fields;
  }
  csv = json2csv(csvOptions);
  fs.writeFile(file, csv, function(err) {
    if (err) throw err;
    console.log('csv saved');
  });
}
