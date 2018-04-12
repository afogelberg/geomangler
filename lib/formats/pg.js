const dbConnect = require('../utils/dbconnect');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();
const geojson = require('./geojson')();

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
  return `select "${table}".*, ST_AsGeoJSON(${geometryName}) AS ${tempGeometryName}
  from "${table}";`;
}

function handleSelectAll(rawQuery, geometryName) {
  return rawQuery
    .then((response) => {
      if (response.rows) {
        const jsonFeatures = renameGeometry(response.rows, geometryName);
        return geojson.readJSON({
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
      if (response.rows) {
        return geojson.readJSON({
          features: response.rows
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
  geometryName = 'geom'
} = {}) {
  const query = selectAll(table, geometryName);
  if (connectionPool) {
    return makeRawQuery(connectionPool, query, geometryName, handleSelectAll)
      .then(features => updateFeatures(features));
  }
  const conn = dbConnect('pg', {
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
  geometryName = 'geom'
} = {}) {
  if (connectionPool) {
    return makeRawQuery(connectionPool, query, geometryName, handleQuery)
      .then(features => updateFeatures(features));
  }
  const conn = dbConnect('pg', {
    connection
  });
  return makeRawQuery(conn, query, geometryName, handleQuery)
    .then((features) => {
      conn.destroy();
      return updateFeatures(features);
    });
}

function pg() {
  return {
    add,
    read
  };
}

module.exports = pg;
