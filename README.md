# @selfage/observable_array

## Install

`npm install @selfage/observable_array`

## Overview

Written in TypeScript and compiled to ES5. Provides a wrapper around native
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
