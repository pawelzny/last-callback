# last-callback v 1.0.3

## Description

Get and call last given argument if is a function. You do not need to check last argument manually any more.
All you need to do is to pass arguments array to this little module, then call it, or bind with `this` context.
Last-callback always return function with built in validation. Last non callable argument will be ignored without throwing any exception.

last-callback is compatible with ES5 and latest.

[![npm](https://img.shields.io/npm/l/last-callback.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dt/last-callback.svg?maxAge=2592000)]()
[![node](https://img.shields.io/node/v/last-callback.svg?maxAge=2592000)]()
[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg?maxAge=2592000)]()
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()

## Requirements

NodeJS >= 4.4.0

## installation

with NPM:

```javascript
npm install -S last-callback
```

## Get last callback

last-callback respects: bind, call, and apply methods;

### ES6 Style

If you are using `NodeJS >= 6.2` You should definitely use __ES6 style__ with spread operators.

```javascript
const lastCallback = require('last-callback');

function myFunc (param) {
    let callback = lastCallback(...arguments);

    callback(param);
}

myFunc('test value', function (param) {
    console.log(param); // 'test value'
});
```

### ES5 Style

If you are still using `NodeJS < 6.2.0`, i.e. `NodeJS 4.4.7 LTS`, you can use __ES5 style__.


```javascript
var lastCallback = require('last-callback');

function myFunc (param) {
    var callback = lastCallback.apply(null, arguments);

    callback(param);
}

myFunc('test value', function (param) {
    console.log(param); // 'test value'
});
```

### ES5 Style with context

```javascript
var lastCallback = require('last-callback');

function myFunc (param) {
    var callback = lastCallback.apply(null, arguments);

    this.contextVariable = 'this is my context';

    callback.call(this, param); // bind context if you need it
}

myFunc('test value', function (param) {
    console.log(param); // 'test value'
    console.log(this.contextVariable); // 'this is my context'
});
```

### Recursive callback

You can use recursive callback if needed.

```javascript
const lastCallback = require('last-callback');

let
    iteration = 1,
    limit = 5;

function myFunc (iteration) {
    let callback = lastCallback(...arguments);

    callback(iteration);
}

function recursiveCallabck (iteration) {
    if (iteration >= limit) {
        return;
    }

    console.log(iteration);

    iteration += 1;
    recursiveCallabck(iteration);
}

myFunc(iteration, recursiveCallabck);
// console log:
// 1
// 2
// 3
// 4
// 5
```

## Contribution

Feel free to Pull Request

## LICENSE
The MIT License (MIT)
Copyright (c) 2016 Paweł Zadrożny
