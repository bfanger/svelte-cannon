import { Vec3 } from "cannon-es";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Vec3Like } from "./types";
import { toVec3 } from "./conversion-fns";

type Vec3Writable = Writable<Vec3> & {
  precision: number;
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
  const value = writable($value) as Vec3Writable;

  const store = {
    subscribe: value.subscribe,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    set(x: Vec3Like | number, y?: number, z?: number) {
      if (x instanceof Vec3 && $value.almostEquals(x, store.precision)) {
        return;
      }
      if (typeof y !== "undefined") {
        $value.set(x as number, y as number, z as number);
      } else if (Array.isArray(x)) {
        $value.set(x[0], x[1], x[2]);
      } else {
        $value.copy(x as Vec3);
      }
      value.set($value);
    },
    update(updater: (val: Vec3) => Vec3Like) {
      value.set(toVec3(updater($value)));
    },
    precision: 0.001,
  };
  return store;
}
