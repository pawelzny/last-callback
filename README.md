# last-callback v 2.0.0

Extract function's last argument and wrap with ready to invoke function.
If last argument is callable, hence callback - wrapper will invoke it.
Otherwise invoked wrapper do nothing.

## Description

Last callback provides callable wrapper for last argument. There is no need for
further checking if last argument is callable.

Wrapping works for infinite number of arguments even undeclared one.

[![npm](https://img.shields.io/npm/l/last-callback.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dt/last-callback.svg?maxAge=2592000)]()
[![node](https://img.shields.io/node/v/last-callback.svg?maxAge=2592000)]()
[![CircleCI](https://img.shields.io/circleci/project/github/pawelzny/last-callback.svg)]()
[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg?maxAge=2592000)]()
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()

## Requirements

NodeJS >= 8.9.0

<div style="color: red; font-weight: 700;">
For NodeJS 4.4, 6.x and 7.x use last-callback version 1.0.3
</div>

## installation

with NPM:

```shell
npm install -S last-callback
```

For older NodeJS

```shell
npm install -S last-callback@1.0.3
```

## Optional callback as last argument

**Scenario:** There is "execute" function which expect last argument to be optional callback.

```javascript
const lastCallback = require('last-callback');

function execute(x, y, cb=null) {
  // 'arguments' is magic variable always visible inside function.
  let callback = lastCallback(...arguments);
  let sum = x + y;

  callback(sum);
  return sum;
}

execute(10, 34, (result) => console.log(result));
```

## Undeclared optional callback as last argument

**Scenario:** There is "make" function which allow callback as last argument.

**TIP** Undeclared arguments will NOT be visible for debugger and IDE inspection.

```javascript
const lastCallback = require('last-callback');

function make(x, y, z) {
  // 'arguments' is magic variable always visible inside function.
  let callback = lastCallback(...arguments);
  let result = (x + y) * z;

  callback(result);
  return result;
}

// make declared 3 arguments: 'x', 'y' and 'z'
// but passing fourth argument is completely legal
// and JS will not complain.
execute(10, 34, 5, (result) => console.log(result));
```

### Calling callback with different context

**Scenario:** There is 'execute' function which expect callback. There is also 'spy' object, which alter callback context.

```javascript
const lastCallback = require('last-callback');

function returnSecret(secret) {
  if (this.secret === undefined) {
    this.secret = secret;
  }

  return this.secret;
}

// returns 'secret' without change
function execute(secret, cb) {
  return lastCallback(...arguments)(secret);
}

// returns 'secret' from different context
function executeContext(secret, context, cb) {
  return lastCallback(...arguments).call(context);
}

secretPassword = 'I am real secret';

// will return 'I am real secret'
execute(secretPassword, returnSecret);

// will return 'Luke I am your father'
executeContext(secretPassword, {secret: 'Luke I am your father}, returnSecret);
```

### Recursive callback

**Scenario:** There is a 'execute' function which expected callback. The callback will be recursive.

```javascript
const lastCallback = require('last-callback');

function recursiveCb (n, t) {
  if (n < t) {
    console.log(n)
    recursiveCb(n + 1, t);
  }
}

function execute(start, stop, cb) {
  lastCallback(...arguments)(start, stop);
}

execute(0, 5, recursiveCb);
// console log result:
// 0
// 1
// 2
// 3
// 4
```

## Contribution

Did you find any bugs?

Maybe this documentation has language mistakes?

You have idea for great new feature?


Create new issue and describe your point of view.
I will do my best to meet all requests.

This repository is open for changes and suggestions.
I encourage you to write your own solution and make pull request.

## LICENSE
The MIT License (MIT)
Copyright (c) 2016 Paweł Zadrożny
