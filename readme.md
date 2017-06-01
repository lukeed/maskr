# maskr [![Build Status](https://travis-ci.org/lukeed/maskr.svg?branch=master)](https://travis-ci.org/lukeed/maskr)

> A tiny (151B) utility to compare a string against a template mask.

[Demo][demo]

Technically, this is still a WIP! See the [Roadmap](#roadmap).

Use this module to compare a value against a desired template. Put differently, you can format a string however you'd like.

This is probably most useful for "masking" `<input />` values. There are no `EventListener`s included in this module

## Install

```
$ npm install --save maskr
```


## Usage

```js
const maskr = require('maskr');
const demo = '(___) ___-____';

maskr(demo, '');
//=> { value:'(___) ___-____', cursor:0 }

maskr(demo, '12345678');
//=> { value:'(123) 456-78__', cursor:12 }

maskr(demo, '1234567890');
//=> { value:'(123) 456-7890', cursor:14 }
```

_**Example `<form />` Usage:** ([demo][demo])_

```js
const maskr = require('maskr');
const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');

function setValue(ev) {
  if (ev !== void 0 && ev.type === 'keydown') {
    ev.preventDefault();
    this._value += ev.key;
  }
  const mask = this.getAttribute('data-mask');
  const { value, cursor } = maskr(mask, this._value);
  // set visible value & cursor position
  this.value = value;
  this.setSelectionRange(cursor, cursor);
}

[].forEach.call(inputs, el => {
  if (!el.hasAttribute('data-mask')) return;
  // init internal tracking
  el._value = el.value || '';
  // first-run if has value
  (el.value.length > 0) && setValue.call(el);
  // attach listeners
  el.onfocus = el.onkeydown = setValue.bind(el);
});
```


## API

### maskr(mask, input)

#### mask

Type: `string`

The template/mask to be used.

#### input

Type: `string`

The value string to match against the `mask`.


## Roadmap

* **1.0**
  - Recognize `_` character only (signifes "any")
  - Find fastest + lightest implementation
* **2.0**
  - Recognize `_` (any), `a` (alpha), and `9` (numeric) characters
  - Likely change API/Type definition
  - Add options: `showEmpty`, custom definitions, ...
* **3.0**
  - Use `?` for optional masked input
  - TBD


## Benchmarks

```
maskr
  --> 6,078,612 ops/sec ±0.40% (94 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[demo]: https://jsfiddle.net/lukeed/fxcs6ret/
