const buffer = require('./manglers/buffer');
const center = require('./manglers/center');
const changeCase = require('./manglers/changecase');
const changeGeometryType = require('./manglers/changegeometrytype');
const deleteFields = require('./manglers/deletefields');
const filterByText = require('./manglers/filterbytext');
const flipCoordinates = require('./manglers/flipcoordinates');
const joinFeatures = require('./manglers/joinfeatures');
const merge = require('./manglers/merge');
const move = require('./manglers/move');
const replaceText = require('./manglers/replacetext');
const renameFields = require('./manglers/renamefields');
const transform = require('./manglers/transform');

module.exports = {
  buffer,
  center,
  changeCase,
  changeGeometryType,
  deleteFields,
  filterByText,
  flipCoordinates,
  joinFeatures,
  merge,
  move,
  renameFields,
  replaceText,
  transform
};
