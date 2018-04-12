/* Test requires a pg database test with a table including data
 ** from fixtures/test-point.geojson.
 */

const test = require('tape');
const gm = require('../../geomangler');
const connection = require('../fixtures/mssql-conf');

test('mssql-0', (assert) => {
  const message = 'Should return feature with valid coordinates';

  gm.add('mssql', 'test_point', {
    connection
  })
    .then((features) => {
      const actual = features[0].getGeometry().getCoordinates().map(feature => feature.toFixed());
      const expected = [1841734.1101797, 8313842.60728307].map(feature => feature.toFixed());
      assert.same(actual, expected, message);
      assert.end();
    });
});

test('mssql-1', (assert) => {
  const message = 'Should return feature with valid coordinates';
  const query = `
    select name, geometry.STAsText() AS geometry
    from "test_point";
  `;

  gm.read('mssql', query, {
    connection
  })
    .then((features) => {
      const actual = features[0].getGeometry().getCoordinates().map(feature => feature.toFixed());
      const expected = [1841734.1101797, 8313842.60728307].map(feature => feature.toFixed());
      assert.same(actual, expected, message);
      assert.end();
    });
});

test('mssql-2', (assert) => {
  const message = 'Should return feature with valid coordinates';

  const conn = gm.db('mssql', {
    connection
  });
  gm.add('mssql', 'test_point', {
    connectionPool: conn
  })
    .then((features) => {
      const actual = features[0].getGeometry().getCoordinates().map(feature => feature.toFixed());
      const expected = [1841734.1101797, 8313842.60728307].map(feature => feature.toFixed());
      conn.destroy();
      assert.same(actual, expected, message);
      assert.end();
    });
});
