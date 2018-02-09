var buffer = require('./manglers/buffer');
var changeCase = require('./manglers/changecase');
var changeGeometryType = require('./manglers/changegeometrytype');
var deleteFields = require('./manglers/deletefields');
var filterByText = require('./manglers/filterbytext');
var flipCoordinates = require('./manglers/flipcoordinates');
var joinFeatures = require('./manglers/joinfeatures');
var merge = require('./manglers/merge');
var move = require('./manglers/move');
var replaceText = require('./manglers/replacetext');
var renameFields = require('./manglers/renamefields');
var transform = require('./manglers/transform');

module.exports = {
  buffer: buffer,
  changeCase: changeCase,
  changeGeometryType: changeGeometryType,
  deleteFields: deleteFields,
  filterByText: filterByText,
  flipCoordinates: flipCoordinates,
  joinFeatures: joinFeatures,
  merge: merge,
  move: move,
  renameFields: renameFields,
  replaceText: replaceText,
  transform: transform
};
