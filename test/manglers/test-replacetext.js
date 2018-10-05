const test = require('tape');
const gm = require('../../geomangler');
const Feature = require('@ol/feature');

test('startsWith-0', (assert) => {
  const message = 'Should return object with replaced text that starts with the given replace string';
  const feature = new Feature({
    foo: 'FooBarfooBarFooBar'
  });
  const actual = gm.replaceText('Foo', 'foo', {
    fields: ['foo'],
    type: 'startsWith',
    features: [feature]
  })[0].getProperties().foo;
  const expected = 'fooBarfooBarFooBar';

  assert.same(actual, expected, message);
  assert.end();
});

test('startsWith-1', (assert) => {
  const message = 'Should return object with replaced text that starts with an empty replace string';
  const feature = new Feature({
    foo: 'FooBarfooBarFooBar'
  });
  const actual = gm.replaceText('Foo', '', {
    fields: ['foo'],
    type: 'startsWith',
    features: [feature]
  })[0].getProperties().foo;
  const expected = 'BarfooBarFooBar';

  assert.same(actual, expected, message);
  assert.end();
});
