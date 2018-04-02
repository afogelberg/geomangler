const fs = require('fs');

module.exports = function csvFile(name, csvFeatures, options) {
  const file = options.path.concat(`${name}.csv`);
  fs.writeFile(file, csvFeatures, (err) => {
    if (err) throw err;
    console.log('csv saved');
  });
};
