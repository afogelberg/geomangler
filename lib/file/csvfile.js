var json2csv = require('json2csv');
var fs = require('fs');

module.exports = function(name, csvFeatures, options) {
  var file = options.path.concat(name + '.csv');
  fs.writeFile(file, csvFeatures, function(err) {
    if (err) throw err;
    console.log('csv saved');
  });
}
