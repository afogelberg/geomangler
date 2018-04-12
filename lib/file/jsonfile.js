const jsonfile = require('jsonfile');

module.exports = function jsonFile(name, jsonLayer, options) {
  const file = options.path.concat(name);
  jsonfile.writeFile(file, jsonLayer, {
    encoding: 'utf8'
  }, () => {});
};
