import { ObservableArray } from "./observable_array";
import { eqObservableArray } from "./test_matcher";
import { Counter } from "@selfage/counter";
import { assertThat, eq } from "@selfage/test_matcher";
import { NODE_TEST_RUNNER } from "@selfage/test_runner";

NODE_TEST_RUNNER.run({
  name: "ObservableArrayTest",
  cases: [
    {
      name: "PushAndIterate",
      execute: () => {
        // Prepare
        let arr = new ObservableArray<number>();
        let counter = new Counter<string>();
        arr.once("element", (index, newValue, oldValue) => {
          counter.increment("onElement");
          assertThat(index, eq(0), "index");
          assertThat(newValue, eq(100), "newValue");
          assertThat(oldValue, eq(undefined), "oldValue");
        });

        // Execute
        arr.push(100);

        // Verify
        assertThat(arr, eqObservableArray([eq(100)]), "arr");
        assertThat(counter.get("onElement"), eq(1), "1st onElement called");

        // Prepare
        arr.once("element", (index, newValue, oldValue) => {
          counter.increment("onElement");
          assertThat(index, eq(1), "index");
          assertThat(newValue, eq(200), "newValue");
          assertThat(oldValue, eq(undefined), "oldValue");
        });

        // Execute
        arr.push(200);

        // Verify
        assertThat(arr, eqObservableArray([eq(100), eq(200)]), "2nd arr");
        assertThat(counter.get("onElement"), eq(2), "2nd onElement called");

        // Execute
        let i = 0;
        for (let element of arr) {
          // Verify
          assertThat(element, eq(arr.get(i)), `${i}th element of arr`);
          i++;
        }
      },
    },
    {
      name: "SetElements",
      execute: () => {
        // Prepare
        let arr = new ObservableArray<number>();
        arr.push(100, 200);
        let counter = new Counter<string>();
        arr.once("element", (index, newValue, oldValue) => {
          counter.increment("onElement");
          assertThat(index, eq(0), "index");
          assertThat(newValue, eq(1), "newValue");
          assertThat(oldValue, eq(100), "oldValue");
        });

        // Execute
        arr.set(0, 1);

        // Verify
        assertThat(arr, eqObservableArray([eq(1), eq(200)]), "arr");
        assertThat(counter.get("onElement"), eq(1), "1st onElement called");

        // Prepare
        arr.on("element", (index, newValue, oldValue) => {
          counter.increment("onElement");
          assertThat(index, eq(1), "index");
          assertThat(newValue, eq(2), "newValue");
          assertThat(oldValue, eq(200), "oldValue");
        });

        // Execute
        arr.set(1, 2);

        // Verify
        assertThat(arr, eqObservableArray([eq(1), eq(2)]), "2nd arr");
        assertThat(counter.get("onElement"), eq(2), "2nd onElement called");

        // Execute
        arr.set(1, 2);

        // Verify
        assertThat(arr, eqObservableArray([eq(1), eq(2)]), "still 2nd arr");
        assertThat(
          counter.get("onElement"),
          eq(2),
          "still 2nd onElement called"
        );
      },
    },
    {
      name: "PopElements",
      execute: () => {
        // Prepare
        let arr = ObservableArray.of(100, 200);
        let counter = new Counter<string>();
        arr.once("element", (index, newValue, oldValue) => {
          counter.increment("onElement");
          assertThat(index, eq(1), "index");
          assertThat(newValue, eq(undefined), "newValue");
          assertThat(oldValue, eq(200), "oldValue");
        });

        // Execute
        let value = arr.pop();

        // Verify
        assertThat(arr, eqObservableArray([eq(100)]), "arr");
        assertThat(value, eq(200), "value");
        assertThat(counter.get("onElement"), eq(1), "1st onElement called");

        // Prepare
        arr.once("element", (index, newValue, oldValue) => {
          counter.increment("onElement");
          assertThat(index, eq(0), "index");
          assertThat(newValue, eq(undefined), "newValue");
          assertThat(oldValue, eq(100), "oldValue");
        });

        // Execute
        value = arr.pop();

        // Verify
        assertThat(arr, eqObservableArray([]), "2nd arr");
        assertThat(value, eq(100), "2nd value");
        assertThat(counter.get("onElement"), eq(2), "2nd onElement called");
      },
    },
    {
      name: "JsonStringify",
      execute: () => {
        // Prepare
        let arr = new ObservableArray<number>();
        arr.push(100, 200);

        // Execute
        let serailzied = JSON.stringify(arr);

        // Verify
        assertThat(serailzied, eq("[100,200]"), "serailzied");
      },
    },
  ],
});
