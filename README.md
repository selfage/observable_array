# @selfage/observable_array

## Install

`npm install @selfage/observable_array`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides a type-safe wrapper around native JavaScript array which is capable to listen to changes.

Note that if the array is consisted of objects, changes on those objects will not be captured. Refer to [@selfage/message#generate-observable-message](https://github.com/selfage/message#generate-observable-message) for a solution to make them observable.

Public methods might not mimic all methods from native array yet. Anyone is welcome to contribute.

## Constructor

We only provide an empty constructor but requires a type of the value.

```TypeScript
import { ObservableArray } from '@selfage/observable_array';

let arr = new ObservableArray<string>();
```

## Listen to changes

Events are emitted by Nodejs's `EventEmitter`. If used in browser, a pollyfill is required.

There is only one event `element` to be emitted whenever the old value `!==` the new value on that index. Therefore it supports primitive types as well as objects.

```TypeScript
let arr = new ObservableArray<string>();
arr.on('element', (index, newValue, oldValue) => {
  // index: number
  // newValue: T
  // oldvalue: T
});
```

## Push and pop

Push and pop works the same way as native array.

```TypeScript
let arr = new ObservableArray<string>();
arr.on('element', (index, newValue, oldValue) => {
  console.log(
    `On index ${index}, newValue is ${newValue} and oldValue is ${oldValue}.`
  );
});
arr.push('one');
// Print: On index 0, newValue is one and oldValue is undefined.
arr.pop();
// Print: On index 0, newValue is undefined and oldValue is one.
```

## Getter and setter

Unlike native array, `arr[0]` cannot be used to get or set a value. Instead,
you have to use get and set methods, due to an unfortunate fact that
TypeScript/JavaScript cannot override `[]` operator.

```TypeScript
let arr = new ObservableArray<string>();
arr.push('one', 'two', 'three');
arr.get(0); // 'one'
arr.on('element', (index, newValue, oldValue) => {
  console.log(
    `On index ${index}, newValue is ${newValue} and oldValue is ${oldValue}.`
  );
});
arr.set(0, 'zero');
// Print: On index 0, newValue is zero and oldValue is one.
```

## Other available methods

The rest of public methods simply mimic the methods from native array, though
we don't mimic all of them.

```TypeScript
let arr = ObservableArray.of('one', 'two', 'three');
arr.length; // 3
arr.indexOf('two'); // 1
JSON.stringify(arr); // ['one','two','three']
for (let value of arr) {} // Loops as usual.
```

## Test matcher

Provides an implementation of test matcher to be used with `@selfage/test_matcher`.

```TypeScript
import { ObservableArray } from '@selfage/observable_array';
import { eqObservableArray } from '@selfage/observable_array/test_matcher';
import { assertThat, eq } from '@selfage/test_matcher'; // Install `@selfage/test_matcher`.

let ob = new ObservableArray<number>();
ob.push(10, 11, 12, 13, 14);
assertThat(ob, eqObservableArray([eq(10), eq(11), eq(12), eq(13), eq(14)]), `ob`);
```

## Design considerations

Refer to [@selfage/message##design-considerations-for-observable-message](https://github.com/selfage/message#design-considerations-for-observable-message) as why we didn't bubble up changes.
