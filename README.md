<div align="center">
  <h1>Skript Reader</h1>
	<p>An Open Source Library for Reading Skript Code</p>
	<a href="https://packagephobia.now.sh/result?p=skript-reader"><img src="https://badgen.net/packagephobia/install/skript-reader@latest" alt="Install Size"></a>
	<a href="https://www.npmjs.com/package/skript-reader"><img src="https://img.shields.io/npm/v/skript-reader" alt="Latest Version"></a>
</div>

---

## Features

- Divide single-line script into different components.
- Provides both nested and collapsed export structure.
- Interpret structure by general syntax, adapt to all add-on format.

## Installation

```bash
npm install skript-reader
```

## Object Types
```
Body,
String,
Number,
Expression,
Variable,
Function,
Indention,
Comment
```

## Example

```js
const skript_reader = require("skript-reader");
const script = "send \"hello %display_name({_uuid::%player%})%\" to {_players::*} #this is an example";

try {
  // prints nested structure
  const elements_nested = skript_reader(script);
  console.log(elements_nested);

  // prints collapsed structure
  const elements_collapsed = elements_nested.collapse_components();
  console.log(elements_collapsed);
} catch (error) {
  // prints syntax error (for example string not properly enclosed)
  console.log(error.toString());
}
```
Result (Nested)
```ts
{
  "object_content": "send \"hello %display_name({_uuid::%player%})%\" to {_players::*} #this is an example",
  "object_depth": 0,
  "parent_types": [],
  "object_type": "body",
  "inner_components": [
    {
      "object_content": "send ",
      "object_depth": 1,
      "parent_types": [],
      "object_type": "body",
      "inner_components": []
    },
    {
      "object_content": "\"hello %display_name({_uuid::%player%})%\"",
      "object_depth": 1,
      "parent_types": [ "body" ],
      "object_type": "string",
      "inner_components": [
        {
          "object_content": "\"hello ",
          "object_depth": 2,
          "parent_types": [ "body" ],
          "object_type": "string",
          "inner_components": []
        },
        {
          "object_content": "%display_name({_uuid::%player%})%",
          "object_depth": 2,
          "parent_types": [ "body", "string" ],
          "object_type": "expression",
          "inner_components": [
            {
              "object_content": "%",
              "object_depth": 3,
              "parent_types": [ "body", "string" ],
              "object_type": "expression",
              "inner_components": []
            },
            {
              "object_content": "display_name({_uuid::%player%})",
              "object_depth": 3,
              "parent_types": [ "body", "string", "expression" ],
              "object_type": "function",
              "inner_components": [
                {
                  "object_content": "display_name(",
                  "object_depth": 4,
                  "parent_types": [ "body", "string", "expression" ],
                  "object_type": "function",
                  "inner_components": []
                },
                {
                  "object_content": "{_uuid::%player%}",
                  "object_depth": 4,
                  "parent_types": [ "body", "string", "expression", "function" ],
                  "object_type": "variable",
                  "inner_components": [
                    {
                      "object_content": "{_uuid::",
                      "object_depth": 5,
                      "parent_types": [ "body", "string", "expression", "function" ],
                      "object_type": "variable",
                      "inner_components": []
                    },
                    {
                      "object_content": "%player%",
                      "object_depth": 5,
                      "parent_types": [ "body", "string", "expression", "function", "variable" ],
                      "object_type": "expression",
                      "inner_components": []
                    },
                    {
                      "object_content": "}",
                      "object_depth": 5,
                      "parent_types": [ "body", "string", "expression", "function" ],
                      "object_type": "variable",
                      "inner_components": []
                    }
                  ]
                },
                {
                  "object_content": ")",
                  "object_depth": 4,
                  "parent_types": [ "body", "string", "expression" ],
                  "object_type": "function",
                  "inner_components": []
                }
              ]
            },
            {
              "object_content": "%",
              "object_depth": 3,
              "parent_types": [ "body", "string" ],
              "object_type": "expression",
              "inner_components": []
            }
          ]
        },
        {
          "object_content": "\"",
          "object_depth": 2,
          "parent_types": [ "body" ],
          "object_type": "string",
          "inner_components": []
        }
      ]
    },
    {
      "object_content": " to ",
      "object_depth": 1,
      "parent_types": [],
      "object_type": "body",
      "inner_components": []
    },
    {
      "object_content": "{_players::*}",
      "object_depth": 1,
      "parent_types": [ "body" ],
      "object_type": "variable",
      "inner_components": []
    },
    {
      "object_content": " ",
      "object_depth": 1,
      "parent_types": [],
      "object_type": "body",
      "inner_components": []
    },
    {
      "object_content": "#this is an example",
      "object_depth": 1,
      "parent_types": [ "body" ],
      "object_type": "comment",
      "inner_components": []
    }
  ]
}
```
Result (Collapsed)
```ts
[
  SkriptObject {
    object_content: 'send ',
    object_depth: 1,
    parent_types: [],
    object_type: 'body',
    inner_components: []
  },
  SkriptObject {
    object_content: '"hello ',
    object_depth: 2,
    parent_types: [ 'body' ],
    object_type: 'string',
    inner_components: []
  },
  SkriptObject {
    object_content: '%',
    object_depth: 3,
    parent_types: [ 'body', 'string' ],
    object_type: 'expression',
    inner_components: []
  },
  SkriptObject {
    object_content: 'display_name(',
    object_depth: 4,
    parent_types: [ 'body', 'string', 'expression' ],
    object_type: 'function',
    inner_components: []
  },
  SkriptObject {
    object_content: '{_uuid::',
    object_depth: 5,
    parent_types: [ 'body', 'string', 'expression', 'function' ],
    object_type: 'variable',
    inner_components: []
  },
  SkriptObject {
    object_content: '%player%',
    object_depth: 5,
    parent_types: [ 'body', 'string', 'expression', 'function', 'variable' ],
    object_type: 'expression',
    inner_components: []
  },
  SkriptObject {
    object_content: '}',
    object_depth: 5,
    parent_types: [ 'body', 'string', 'expression', 'function' ],
    object_type: 'variable',
    inner_components: []
  },
  SkriptObject {
    object_content: ')',
    object_depth: 4,
    parent_types: [ 'body', 'string', 'expression' ],
    object_type: 'function',
    inner_components: []
  },
  SkriptObject {
    object_content: '%',
    object_depth: 3,
    parent_types: [ 'body', 'string' ],
    object_type: 'expression',
    inner_components: []
  },
  SkriptObject {
    object_content: '"',
    object_depth: 2,
    parent_types: [ 'body' ],
    object_type: 'string',
    inner_components: []
  },
  SkriptObject {
    object_content: ' to ',
    object_depth: 1,
    parent_types: [],
    object_type: 'body',
    inner_components: []
  },
  SkriptObject {
    object_content: '{_players::*}',
    object_depth: 1,
    parent_types: [ 'body' ],
    object_type: 'variable',
    inner_components: []
  },
  SkriptObject {
    object_content: ' ',
    object_depth: 1,
    parent_types: [],
    object_type: 'body',
    inner_components: []
  },
  SkriptObject {
    object_content: '#this is an example',
    object_depth: 1,
    parent_types: [ 'body' ],
    object_type: 'comment',
    inner_components: []
  }
]
```