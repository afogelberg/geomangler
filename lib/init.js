const projection = require('./projection');
const server = require('../server/server');

module.exports = function init(options) {
  projection.setProjections();
}
