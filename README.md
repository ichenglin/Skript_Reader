<div align="center">
    <h1>Skript Reader</h1>
	<p>An Open Source Library for Reading Skript Code</p>
	<a href="https://packagephobia.now.sh/result?p=skript-reader"><img src="https://badgen.net/packagephobia/install/skript-reader" alt="Current version"></a>
	<a href="https://www.npmjs.com/package/skript-reader"><img src="https://img.shields.io/npm/v/skript-reader" alt="Install size"></a>
</div>

---

## Features

- Divide single-line script into different components.
- Provides both nested and collapsed export structure.

## Installation

```bash
npm install skript-reader
```

## Example

```js
const skript_reader = require("skript-reader");
const script = "add 10 and \"Hello World\" to {_var::*}";

// prints nested structure
const elements_nested = skript_reader(script);
console.log(elements_nested);

// prints collapsed structure
const elements_collapsed = elements_nested.collapse_components();
console.log(elements_collapsed);
```
Result (Nested)
```ts
SkriptObject {
  object_content: 'add 10 and "Hello World" to {_var::*}',
  object_type: 'body',
  inner_components: [
    SkriptObject {
      object_content: 'add ',
      object_type: 'body',
      inner_components: []
    },
    SkriptObject {
      object_content: '10',
      object_type: 'number',
      inner_components: []
    },
    SkriptObject {
      object_content: ' and ',
      object_type: 'body',
      inner_components: []
    },
    SkriptObject {
      object_content: '"Hello World"',
      object_type: 'string',
      inner_components: []
    },
    SkriptObject {
      object_content: ' to ',
      object_type: 'body',
      inner_components: []
    },
    SkriptObject {
      object_content: '{_var::*}',
      object_type: 'variable',
      inner_components: []
    }
  ]
}
```
Result (Collapsed)
```ts
[
  SkriptObject {
    object_content: 'add ',
    object_type: 'body',
    inner_components: []
  },
  SkriptObject {
    object_content: '10',
    object_type: 'number',
    inner_components: []
  },
  SkriptObject {
    object_content: ' and ',
    object_type: 'body',
    inner_components: []
  },
  SkriptObject {
    object_content: '"Hello World"',
    object_type: 'string',
    inner_components: []
  },
  SkriptObject {
    object_content: ' to ',
    object_type: 'body',
    inner_components: []
  },
  SkriptObject {
    object_content: '{_var::*}',
    object_type: 'variable',
    inner_components: []
  }
]
```