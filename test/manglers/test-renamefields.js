const test = require('tape');
const gm = require('../../geomangler');
const Feature = require('@ol/feature');

test('renameFields', (assert) => {
  const message = 'Should return object with the renamed property bar';
  const feature = new Feature({
    foo: 'foo',
  });
  const actual = gm.renameFields({
    bar: 'foo',
  }, {
    features: [feature],
  })[0].getProperties();
  const expected = {
    bar: 'foo',
  };

  assert.same(actual, expected, message);
  assert.end();
});
