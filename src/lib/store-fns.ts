import { Vec3 } from "cannon-es";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Vec3Like } from "./types";

export function writableVec3(): Writable<Vec3>;
export function writableVec3(vec3: Vec3Like): Writable<Vec3>;
export function writableVec3(x: number, y: number, z: number): Writable<Vec3>;
export function writableVec3(
  x?: Vec3Like | number,
  y?: number,
  z?: number
): Writable<Vec3> {
  if (arguments.length === 3) {
    return writable(new Vec3(x as number, y, z));
  }
  const vec3 = new Vec3();
  if (arguments.length === 1) {
    if (Array.isArray(x)) {
      vec3.set(x[0], x[1], x[2]);
    } else {
      vec3.copy(x as unknown as Vec3);
    }
  }
  return writable(vec3);
}
