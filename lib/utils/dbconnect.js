const db = require('knex');

module.exports = (dbType, {
  connection = {},
  pool = { min: 0, max: 7 },
} = {}) => {
  const conn = db({
    client: dbType,
    connection,
    pool,
  });
  return conn;
};
