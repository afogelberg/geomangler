const dbConnect = require('../utils/dbconnect');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();
const wkt = require('./wkt')();

const tempGeometryName = '__geom';

function renameGeometry(rows, geometryName) {
  return rows.map((row) => {
    delete row[geometryName];
    row[geometryName] = row[tempGeometryName];
    delete row[tempGeometryName];
    return row;
  });
}

function selectAll(table, geometryName) {
  return `select "${table}".*,${geometryName}.STAsText() AS ${tempGeometryName}
  from "${table}";`;
}

function handleSelectAll(rawQuery, geometryName) {
  return rawQuery
    .then((response) => {
      if (response instanceof Array) {
        const jsonFeatures = renameGeometry(response, geometryName);
        return wkt.readJSON({
          features: jsonFeatures
        }, {
          geometryName
        });
      }
      throw new Error('No valid result');
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

function handleQuery(rawQuery, geometryName) {
  return rawQuery
    .then((response) => {
      if (response instanceof Array) {
        return wkt.readJSON({
          features: response
        }, {
          geometryName
        });
      }
      throw new Error('No valid result');
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

function makeRawQuery(connection, query, geometryName, handler) {
  return handler(connection.raw(query), geometryName);
}

function updateFeatures(features) {
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function add(table, {
  connection = {},
  connectionPool,
  geometryName = 'geometry'
} = {}) {
  const query = selectAll(table, geometryName);
  if (connectionPool) {
    return makeRawQuery(connectionPool, query, geometryName, handleSelectAll)
      .then(features => updateFeatures(features));
  }
  const conn = dbConnect('mssql', {
    connection
  });
  return makeRawQuery(conn, query, geometryName, handleSelectAll)
    .then((features) => {
      conn.destroy();
      return updateFeatures(features);
    });
}

function read(query, {
  connection = {},
  connectionPool,
  geometryName = 'geometry'
} = {}) {
  if (connectionPool) {
    return makeRawQuery(connectionPool, query, geometryName, handleQuery)
      .then(features => updateFeatures(features));
  }
  const conn = dbConnect('mssql', {
    connection
  });
  return makeRawQuery(conn, query, geometryName, handleQuery)
    .then((features) => {
      conn.destroy();
      return updateFeatures(features);
    });
}

function mssql() {
  return {
    add,
    read
  };
}

module.exports = mssql;
