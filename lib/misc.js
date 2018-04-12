const add = require('./add');
const db = require('./utils/dbconnect');
const read = require('./read');
const save = require('./save');
const server = require('../server/server');
const write = require('./write');

module.exports = {
  add,
  db,
  read,
  save,
  server,
  write
};
