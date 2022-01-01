import { Vec3 } from "cannon-es";
import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ConnectableStore, Vec3Like } from "./types";

type Vec3Writable = ConnectableStore<Vec3> & { precision: number };
export function writableVec3(): Vec3Writable;
export function writableVec3(vec3: Vec3Like): Vec3Writable;
export function writableVec3(x: number, y: number, z: number): Vec3Writable;
export function writableVec3(
  x?: Vec3Like | number,
  y?: number,
  z?: number
): Vec3Writable {
  const $value = new Vec3();
  if (arguments.length === 3) {
    $value.set(x as number, y as number, z as number);
  } else if (arguments.length === 1) {
    if (Array.isArray(x)) {
      $value.set(x[0], x[1], x[2]);
    } else {
      $value.copy(x as unknown as Vec3);
    }
  }
  const store = connectable(writable($value)) as Vec3Writable;
  store.precision = 0.001;
  const { onStep } = store;
  store.onStep = (next) => {
    if ($value.almostEquals(next, store.precision) === false) {
      $value.copy(next);
      onStep($value);
    }
  };
  return store;
}

function connectable<T>(value: Writable<T>) {
  const store: ConnectableStore<T> = {
    subscribe: value.subscribe,
    set($value: T) {
      value.set($value);
      store.onSet($value);
    },
    update(callback: ($value: T) => T) {
      store.set(callback(get(value)));
    },
    onStep($value: T) {
      value.set($value);
    },
    onSet() {},
  };
  return store;
}
