import { Quaternion, Vec3 } from "cannon-es";
import { derived, writable } from "svelte/store";
import type { Readable, Writable } from "svelte/store";

type Options = {
  precision: number;
  step: Readable<void>;
};

export function createVec3FromPropStore<T extends string>(
  instance: Record<T, Vec3>,
  property: T,
  { step, precision }: Options
): Writable<Vec3> {
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
  { step, precision }: Options
): Writable<Quaternion> {
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

export function derivedEulerStore(
  quaternion: Readable<Quaternion>
): Readable<Vec3> {
  const value = new Vec3();
  return derived(quaternion, ($quaternion) => {
    $quaternion.toEuler(value);
    return value;
  });
}
