/* Test requires a pg database test with a table including data
 ** from fixtures/test-point.geojson.
 */

const test = require('tape');
const gm = require('../../geomangler');
const connection = require('../fixtures/pg-conf');

test('pg-0', (assert) => {
  const message = 'Should return feature with valid coordinates';

  gm.add('pg', 'test-point', {
    connection
  })
    .then((features) => {
      const actual = features[0].getGeometry().getCoordinates();
      const expected = [1841734.1101797, 8313842.60728307];
      assert.same(actual, expected, message);
      assert.end();
    });
});

test('pg-1', (assert) => {
  const message = 'Should return feature with valid coordinates';
  const query = `
    select name, ST_AsGeoJSON(geom) AS geom
    from "test-point";
  `;

  gm.read('pg', query, {
    connection
  })
    .then((features) => {
      const actual = features[0].getGeometry().getCoordinates();
      const expected = [1841734.1101797, 8313842.60728307];
      assert.same(actual, expected, message);
      assert.end();
    });
});

test('pg-2', (assert) => {
  const message = 'Should return feature with valid coordinates';

  const conn = gm.db('pg', {
    connection
  });
  gm.add('pg', 'test-point', {
    connectionPool: conn
  })
    .then((features) => {
      const actual = features[0].getGeometry().getCoordinates();
      const expected = [1841734.1101797, 8313842.60728307];
      conn.destroy();
      assert.same(actual, expected, message);
      assert.end();
    });
});
