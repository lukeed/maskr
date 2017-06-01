const test = require('tape');
const fn = require('../dist/maskr');

const foo = '(___) ___-____';
const run = str => fn(foo, str);

test('maskr', t => {
	t.equal(typeof fn, 'function', 'exports a function');
	t.end();
});

test('maskr()', t => {
	t.equal(typeof fn(foo, ''), 'object', 'returns an object');
	t.end();
});

test('output', t => {
	t.deepEqual(run(''), { value:foo, cursor:1 }, 'returns mask & index 0 on empty input');
	t.deepEqual(run('123'), { value:'(123) ___-____', cursor:6 }, 'returns partially filled value w/ correct index');
	t.deepEqual(run('12345678'), { value:'(123) 456-78__', cursor:12 }, 'returns mostly filled value w/ correct index');
	t.deepEqual(run('1234567890'), { value:'(123) 456-7890', cursor:14 }, 'returns filled value w/ done index');
	t.deepEqual(run('12345678900909090'), { value:'(123) 456-7890', cursor:14 }, 'ignores input beyond available placeholders');
	t.end();
});
