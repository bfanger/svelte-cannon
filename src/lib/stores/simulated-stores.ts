import type { Quaternion, Vec3 } from "cannon-es";
import type { Readable, Writable } from "svelte/store";
import { writable } from "svelte/store";
import { getStepContext } from "$lib/context-fns";

type Options = {
  precision?: number;
  step?: Readable<void>;
};

export function createVec3FromPropStore<T extends string>(
  instance: Record<T, Vec3>,
  property: T,
  options?: Options
): Writable<Vec3> {
  const step = options?.step || getStepContext();
  const precision = options?.precision ?? 0.001;
  const value = instance[property].clone();
  const store = writable(value, () => {
    return step.subscribe(() => {
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

export function createQuaternionStore<T extends string>(
  instance: Record<T, Quaternion>,
  property: T,
  options?: Options
): Writable<Quaternion> {
  const step = options?.step || getStepContext();
  const precision = options?.precision ?? 0.001;
  const value = instance[property].clone();
  const store = writable(value, () => {
    return step.subscribe(() => {
      const next = instance[property];
      if (
        Math.abs(value.x - next.x) > precision ||
        Math.abs(value.y - next.y) > precision ||
        Math.abs(value.z - next.z) > precision ||
        Math.abs(value.w - next.w) > precision
      ) {
        value.copy(next);
        store.set(value);
      }
    });
  });
  function set(val: Quaternion) {
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
