import { readable } from "svelte/store";
import type { Writable } from "svelte/store";

function pairwise<T>(
  onChange: (next: T, prev: T) => void,
  initial: T
): Writable<T>;
function pairwise<T>(
  onChange: (next: T, prev: T | undefined) => void,
  initial?: T
): Writable<T | undefined>;
function pairwise<T>(
  onChange: (next: T, prev: T | undefined) => void,
  initial?: T
): Writable<T | undefined> {
  let previous = initial;
  let emit: (valeue: T) => void;
  function set(value: T) {
    onChange(value, previous);
    previous = value;
    emit(value);
  }
  const store = readable(initial, (update) => {
    emit = update;
  });
  return {
    subscribe: store.subscribe,
    set,
    update(callback: (value: T | undefined) => T) {
      set(callback(previous));
    },
  };
}

export default pairwise;
