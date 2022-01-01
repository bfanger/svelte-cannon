import { Vec3 } from "cannon-es";
import { writable } from "svelte/store";
import type { ConnectableStore, Vec3Like } from "./types";

type Vec3Writable = ConnectableStore<Vec3> & {
  precision: number;
  set(value: Vec3Like): void;
  set(x: number, y: number, z: number): void;
};
export function writableVec3(): Vec3Writable;
export function writableVec3(vec3: Vec3Like): Vec3Writable;
export function writableVec3(x: number, y: number, z: number): Vec3Writable;
export function writableVec3(
  x?: Vec3Like | number,
  y?: number,
  z?: number
): Vec3Writable {
  const $value = new Vec3();
  if (typeof y !== "undefined") {
    $value.set(x as number, y as number, z as number);
  } else if (typeof x !== "undefined") {
    if (Array.isArray(x)) {
      $value.set(x[0], x[1], x[2]);
    } else {
      $value.copy(x as unknown as Vec3);
    }
  }
  const store = writable($value) as Vec3Writable;
  const { set: rawSet } = store;
  store.precision = 0.001;
  store.onSet = () => {};
  store.onStep = (next) => {
    if ($value.almostEquals(next, store.precision) === false) {
      $value.copy(next);
      rawSet($value);
    }
  };
  store.set = (xx: Vec3Like | number, yy?: number, zz?: number) => {
    if (typeof yy !== "undefined") {
      $value.set(xx as number, yy as number, zz as number);
    } else if (Array.isArray(xx)) {
      $value.set(xx[0], xx[1], xx[2]);
    } else {
      $value.copy(xx as Vec3);
    }
    rawSet($value);
    store.onSet($value);
  };
  return store;
}
