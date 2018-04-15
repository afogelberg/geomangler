const test = require('tape');
const gm = require('../../geomangler');

test('wkt-writejson', (assert) => {
  const message = 'Should return feature with valid wkt string geometry';
  const geometryName = 'geometry';
  const feature = gm.add('geojson', '../fixtures/test-point.geojson');
  const wkt = gm.write('json', {
    features: feature,
    geometryFormat: 'wkt',
    geometryName
  });

  const actual = wkt.features[0][geometryName];
  const expected = 'POINT(1841734.11 8313842.61)';
  assert.same(actual, expected, message);
  assert.end();
});

test('wkt-writejson-polygon', (assert) => {
  const message = 'Should return feature with valid wkt string geometry';
  const geometryName = 'geometry';
  const jsonLayer = {
    features: [{
      geometry: {
        type: 'Polygon',
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:EPSG::3010'
          }
        },
        coordinates: [
          [
            [152704.72000000003, 6612807.4799999995],
            [152771.92000000004, 6612809.16],
            [152713.12000000002, 6612745.319999999],
            [152704.72000000003, 6612807.4799999995]
          ]
        ]
      }
    }]
  };
  const feature = gm.read('json', jsonLayer, {
    geometryFormat: 'geojson',
    geometryName
  });
  const wkt = gm.write('json', {
    features: feature,
    geometryFormat: 'wkt',
    geometryName
  });

  const actual = wkt.features[0][geometryName];
  const expected = 'POLYGON((152704.72000000003 6612807.4799999995,152771.92000000004 6612809.16,152713.12000000002 6612745.319999999,152704.72000000003 6612807.4799999995))';
  assert.same(actual, expected, message);
  assert.end();
});
