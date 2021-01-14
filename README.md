# @selfage/observable_array

## Install

`npm install @selfage/observable_array`

## Overview

Written in TypeScript and compiled to ES6. Provides a wrapper around native
JavaScript array which is capable to listen to changes happened on itself. The
change event is not bubbled up by the design that observable objects don't care
about changes happend to its nested objects.

Public methods might not mimic all methods from native array. Anyone is welcome
to contribute.

## Constructor

We only provide an empty constructor but requires a type of the value.

```TypeScript
import { ObservableArray } from '@selfage/observable_array';

let arr = new ObservableArray<string>();
```

## Listen to changes

A hook is exposed for you to listen to any change happend on the array, which
is being called only when the old value `!==` the new value on that index.
Therefore it supports primitive types as well as objects.

```TypeScript
let arr = new ObservableArray<string>();
arr.onElementChange = (index, newValue, oldValue) => {
  // index: number
  // newValue: T
  // oldvalue: T
};
```

## Push and pop

Push and pop works the same way as native array.

```TypeScript
let arr = new ObservableArray<string>();
arr.onElementChange = (index, newValue, oldValue) => {
  console.log(
    `On index ${index}, newValue is ${newValue} and oldValue is ${oldValue}.`
  );
};
arr.push('one');
// Print: On index 0, newValue is one and oldValue is undefined.
arr.pop();
// Print: On index 0, newValue is undefined and oldValue is one.
```

## Getter and setter

Unlike native array, `arr[0]` cannot be used to get or set a value. Instead,
you have to set get and set methods, due to an unfortunate fact that
TypeScript/JavaScript cannot override `[]` operator.

```TypeScript
let arr = new ObservableArray<string>();
arr.push('one', 'two', 'three');
arr.get(0); // 'one'
arr.onElementChange = (index, newValue, oldValue) => {
  console.log(
    `On index ${index}, newValue is ${newValue} and oldValue is ${oldValue}.`
  );
};
arr.set(0, 'zero');
// Print: On index 0, newValue is zero and oldValue is one.
```

## Other available methods

The rest of public methods simply mimic the methods from native array, though
we don't mimic all of them.

```TypeScript
let arr = new ObservableArray<string>();
arr.push('one', 'two', 'three');
arr.length; // 3
arr.indexOf('two'); // 1
JSON.stringify(arr); // ['one','two','three']
for (let value of arr) {} // Loops as usual.
```
