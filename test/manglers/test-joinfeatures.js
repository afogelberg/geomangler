const test = require('tape');
const gm = require('../../geomangler');
const Feature = require('@ol/feature');
const Point = require('@ol/geom/point');

const sampleGeometry1 = new Point([100, 100]);
const sampleGeometry2 = new Point([101, 101]);
const sampleGeometry3 = new Point([102, 102]);
const sampleGeometry4 = new Point([103, 103]);
const sampleFeature1 = new Feature({
  id: 1,
  name: 'Luke',
  geometry: sampleGeometry1
});
const sampleFeature2 = new Feature({
  id: 2,
  name: 'Obi-wan',
  geometry: sampleGeometry2
});
const sampleFeature3 = new Feature({
  jedi: true,
  fkey: 1,
  geometry: sampleGeometry3
});
const sampleFeature4 = new Feature({
  jedi: true,
  fkey: 10000,
  geometry: sampleGeometry4
});

test('joinFeatures-0', (assert) => {
  const message = 'Should return joined feature with target geometry';
  const feature1 = sampleFeature1.clone();
  const feature2 = sampleFeature2.clone();
  const feature3 = sampleFeature3.clone();

  const joined = gm.joinFeatures([feature3], 'fkey', {
    features: [feature1, feature2],
    targetField: 'id'
  });

  const actual = joined[0].getProperties();
  const expected = {
    id: 1,
    jedi: true,
    name: 'Luke',
    geometry: feature1.getGeometry()
  };

  assert.same(actual, expected, message);
  assert.end();
});

test('joinFeatures-1', (assert) => {
  const message = 'Should return joined feature with source geometry';
  const feature1 = sampleFeature1.clone();
  const feature2 = sampleFeature2.clone();
  const feature3 = sampleFeature3.clone();

  const joined = gm.joinFeatures([feature3], 'fkey', {
    features: [feature1, feature2],
    geometrySource: 'source',
    targetField: 'id'
  });

  const actual = joined[0].getProperties().geometry.getCoordinates();
  const expected = sampleGeometry3.getCoordinates();

  assert.same(actual, expected, message);
  assert.end();
});

test('joinFeatures-2', (assert) => {
  const message = 'Should return joined features with same length as target';
  const feature1 = sampleFeature1.clone();
  const feature2 = sampleFeature2.clone();
  const feature3 = sampleFeature3.clone();
  const features = [feature1, feature2];

  const joined = gm.joinFeatures([feature3], 'fkey', {
    features,
    geometrySource: 'source',
    targetField: 'id'
  });

  const actual = joined.length;
  const expected = features.length;

  assert.same(actual, expected, message);
  assert.end();
});


test('joinFeatures-3', (assert) => {
  const message = 'Should return joined features with length of matched features';
  const feature1 = sampleFeature1.clone();
  const feature2 = sampleFeature2.clone();
  const feature3 = sampleFeature3.clone();
  const feature4 = sampleFeature4.clone();
  const features = [feature1, feature2];
  const sourceFeatures = [feature3, feature4];

  const joined = gm.joinFeatures(sourceFeatures, 'fkey', {
    features,
    geometrySource: 'source',
    targetField: 'id',
    keepAll: false
  });

  const actual = joined.length;
  const expected = 1;

  assert.same(actual, expected, message);
  assert.end();
});
