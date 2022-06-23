import { ObservableArray } from "./observable_array";
import { MatchFn, assertThat, eq, assert } from "@selfage/test_matcher";

export function eqObservableArray<T>(
  expected?: Array<MatchFn<T>>
): MatchFn<ObservableArray<T>> {
  return (actual) => {
    if (expected === undefined) {
      assertThat(actual, eq(undefined), "nullity");
      return;
    }
    assert(Boolean(actual), `to not be null`, `null`);
    assertThat(actual.length, eq(expected.length), `array length`);
    for (let i = 0; i < actual.length; i++) {
      assertThat(actual.get(i), expected[i], `${i}th element`);
    }
  };
}
