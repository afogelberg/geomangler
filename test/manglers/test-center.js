const test = require('tape');
const gm = require('../../geomangler');
const Feature = require('@ol/feature');
const Point = require('@ol/geom/point');
const MultiPoint = require('@ol/geom/multipoint');
const LineString = require('@ol/geom/linestring');
const MultiLineString = require('@ol/geom/multilinestring');
const Polygon = require('@ol/geom/polygon');
const MultiPolygon = require('@ol/geom/multipolygon');
const Circle = require('@ol/geom/circle');

const pointGeometry = new Point([10, 10]);
const multiPointGeometry = new MultiPoint([[10, 10], [20, 20]]);
const lineGeometry = new LineString([[10, 10], [20, 20], [30, 30]]);
const multiLineGeometry = new MultiLineString([[[10, 10], [20, 20], [30, 30]]]);
const polygonGeometry = new Polygon([[[10, 10], [10, 20], [20, 20], [20, 10], [10, 10]]]);
const multiPolygonGeometry = new MultiPolygon([[[[10, 10], [10, 20], [20, 20], [20, 10], [10, 10]]]]);
const circleGeometry = new Circle([10, 10], 10);

const pointFeature = new Feature({
  geometry: pointGeometry
});
const multiPointFeature = new Feature({
  geometry: multiPointGeometry
});
const lineFeature = new Feature({
  geometry: lineGeometry
});
const multiLineFeature = new Feature({
  geometry: multiLineGeometry
});
const polygonFeature = new Feature({
  geometry: polygonGeometry
});
const multiPolygonFeature = new Feature({
  geometry: multiPolygonGeometry
});
const circleFeature = new Feature({
  geometry: circleGeometry
});

test('center-0', (assert) => {
  const message = 'Should return center coordinates of a point feature';
  const features = gm.center({ features: [pointFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [10, 10];
  assert.same(actual, expected, message);
  assert.end();
});

test('center-1', (assert) => {
  const message = 'Should return center coordinates of a line feature';
  const features = gm.center({ features: [lineFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [20, 20];
  assert.same(actual, expected, message);
  assert.end();
});

test('center-2', (assert) => {
  const message = 'Should return center coordinates of a polygon feature';
  const features = gm.center({ features: [polygonFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [15, 15];
  assert.same(actual, expected, message);
  assert.end();
});

test('center-3', (assert) => {
  const message = 'Should return center coordinates of a circle feature';
  const features = gm.center({ features: [circleFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [10, 10];
  assert.same(actual, expected, message);
  assert.end();
});

test('center-4', (assert) => {
  const message = 'Should return center coordinates of first geometry of multi point feature';
  const features = gm.center({ features: [multiPointFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [10, 10];
  assert.same(actual, expected, message);
  assert.end();
});

test('center-5', (assert) => {
  const message = 'Should return center coordinates of first geometry of multi line feature';
  const features = gm.center({ features: [multiLineFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [20, 20];
  assert.same(actual, expected, message);
  assert.end();
});

test('center-6', (assert) => {
  const message = 'Should return center coordinates of first geometry of multi polygon feature';
  const features = gm.center({ features: [multiPolygonFeature] });
  const actual = features[0].getGeometry().getCoordinates();
  const expected = [15, 15];
  assert.same(actual, expected, message);
  assert.end();
});
