var add = require('./add');
var read = require('./read');
var save = require('./save');
var server = require('../server/server');
var write = require('./write');

module.exports = {
  add: add,
  read: read,
  save: save,
  server: server,
  write: write
};
