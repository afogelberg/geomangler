var buffer = require('./manglers/buffer');
var changeCase = require('./manglers/changecase');
var deleteFields = require('./manglers/deletefields');
var filterByText = require('./manglers/filterbytext');
var joinFeatures = require('./manglers/joinfeatures');
var merge = require('./manglers/merge');
var replaceText = require('./manglers/replacetext');
var renameFields = require('./manglers/renamefields');
var transform = require('./manglers/transform');

module.exports = {
  buffer: buffer,
  changeCase: changeCase,
  deleteFields: deleteFields,
  filterByText: filterByText,
  joinFeatures: joinFeatures,
  merge: merge,
  renameFields: renameFields,
  replaceText: replaceText,
  transform: transform
};
