var jsonfile = require('jsonfile');

module.exports = function(name, jsonLayer, options) {
  var file = options.path.concat(name);
  jsonfile.writeFile(file, jsonLayer, {encoding: 'utf8'}, function (err) {
    // console.error(err);
  });
}
