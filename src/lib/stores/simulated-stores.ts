import type { Vec3 } from "cannon-es";
import type { Readable, Writable } from "svelte/store";
import { writable } from "svelte/store";
import { getStepContext } from "$lib/context-fns";

export function fromPosition(instance: { position: Vec3 }, precision = 0.001) {
  return createVec3Store(instance, "position", precision);
}

export function createVec3Store<T extends string>(
  instance: Record<T, Vec3>,
  property: T,
  precision: number,
  step?: Readable<void>
): Writable<Vec3> {
  const trigger = step || getStepContext();
  const value = instance[property].clone();
  const store = writable(value, () => {
    return trigger.subscribe(() => {
      const next = instance[property];
      if (value.almostEquals(next, precision) === false) {
        value.copy(next);
        store.set(value);
      }
    });
  });
  function set(val: Vec3) {
    value.copy(val);
    store.set(value);
  }
  return {
    subscribe: store.subscribe,
    set,
    update(callback) {
      set(callback(value));
    },
  };
}
