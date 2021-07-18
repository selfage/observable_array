import EventEmitter = require("events");

export interface ObservableArray<T> {
  on(
    event: "element",
    listener: (index: number, newValue: T, oldValue: T) => void
  ): this;
  on(event: string, listener: Function): this;
}

export class ObservableArray<T> extends EventEmitter implements Iterable<T> {
  private actualArray: T[] = [];

  public static of<T>(...values: Array<T>): ObservableArray<T> {
    let observableArray = new ObservableArray<T>();
    observableArray.push(...values);
    return observableArray;
  }

  public get(index: number): T {
    return this.actualArray[index];
  }

  public set(index: number, newValue: T): void {
    let oldValue = this.actualArray[index];
    if (newValue === oldValue) {
      return;
    }
    this.actualArray[index] = newValue;
    this.emit("element", index, newValue, oldValue);
  }

  public push(...newValues: Array<T>): void {
    for (let newValue of newValues) {
      this.actualArray.push(newValue);
      let index = this.actualArray.length - 1;
      this.emit("element", index, newValue, undefined);
    }
  }

  public pop(): T {
    let oldValue = this.actualArray.pop();
    let index = this.actualArray.length;
    this.emit("element", index, undefined, oldValue);
    return oldValue;
  }

  get length(): number {
    return this.actualArray.length;
  }

  public [Symbol.iterator](): Iterator<T> {
    return this.actualArray[Symbol.iterator]();
  }

  public indexOf(value: T): number {
    return this.actualArray.indexOf(value);
  }

  public toJSON(): Array<T> {
    return this.actualArray;
  }
}
