<div align="center">
	<h1>Skript Reader</h1>
	<p>An Open Source Library for Reading Skript Code</p>
	<a href="https://packagephobia.now.sh/result?p=skript-reader"><img src="https://badgen.net/packagephobia/install/skript-reader@latest" alt="Install Size"></a>
	<a href="https://www.npmjs.com/package/skript-reader"><img src="https://img.shields.io/npm/v/skript-reader" alt="Latest Version"></a>
</div>

<br>

![skript_reader](https://user-images.githubusercontent.com/41904540/183946760-1419c8dc-76f5-49b2-ae2d-cbc8afc07e46.png)

## Purpose

**[Skript Reader](https://github.com/ichenglin/Skript_Reader)** is an **open-source library** made to
**interpret** the **component types** of **[Skript](https://github.com/SkriptLang/Skript)** codes recursively,
in order to provide an **easy implementation** for **syntax markup** and **obfuscation**.
This library is mainly used in the development of
**[Skript Studio](https://github.com/ichenglin/Skript_Studio)** and **[Skript Obfuscator](https://github.com/ichenglin/Skript_Obfuscator)**.

The **demo** of the library could be accessed in **[Skript Studio](https://skriptstudio.runtimecloud.com/)**.


## Features

- Divide single-line script into **comprehensive components**.
- Provides both **nested** and **collapsed** export structure.
- Interpret structure by **general syntax**, adapt to **all add-on** format.

## Installation

```bash
npm install skript-reader
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

## Components

| Type                             | Description                                | Example                                     |
| :------------------------------: | :----------------------------------------: | :-----------------------------------------: |
| **`body                      `** |                                            |                                             |
| **`string                    `** | enclosed string literals                   | **`"hello world"`**                         |
| **`number                    `** | decimal numbers *`(base 10)`*              | **`10.5`**                                  |
| **`boolean                   `** | boolean values *`(true / false)`*          | **`true`**                                  |
| **`expression                `** | general expression statements              | **`%player's name%`**                       |
| **`variable                  `** | enclosed variables                         | **`{_player}`**                             |
| **`function                  `** | function statements *`(declare / access)`* | **`world()`**                               |
| **`indention                 `** | script line indention *`(tabs / spaces)`*  |                                             |
| **`comment                   `** | script comments                            | **`# TODO: fix bug`**                       |
| **`function_parameter        `** |                                            |                                             |
| **`function_parameter_name   `** | function parameter name                    | login(**`username`**: string = "anonymous") |
| **`function_parameter_type   `** | function parameter object type             | login(username: **`string`** = "anonymous") |
| **`function_parameter_default`** | function parameter default object          | login(username: string = **`"anonymous"`**) |

## Return Structure

**[Skript Reader](https://github.com/ichenglin/Skript_Reader)** supports exporting the components in both **nested** and **collapsed** structures,
try **clicking** on any of the following **collapsible sections** to view them.

<details>
	<summary><b>Nested Result</b> (Click to Expand)</summary>

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
</details>

<details>
	<summary><b>Collapsed Result</b> (Click to Expand)</summary>

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
</details>