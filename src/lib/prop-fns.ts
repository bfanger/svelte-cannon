import { Vec3, Quaternion } from "cannon-es";
import { get } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Vec3Like } from "./types";

export function isWritable<T>(prop: any): prop is Writable<T> {
  return !!(
    prop &&
    typeof prop.subscribe === "function" &&
    typeof prop.set === "function"
  );
}

export function vec3FromProp(prop: Vec3Like): Vec3;
export function vec3FromProp(
  prop: Vec3Like | Writable<Vec3> | undefined
): Vec3 | undefined;
export function vec3FromProp(
  prop: Vec3Like | Writable<Vec3> | undefined
): Vec3 | undefined {
  if (!prop) {
    return undefined;
  }
  if (Array.isArray(prop)) {
    return new Vec3(prop[0], prop[1], prop[2]);
  }
  if (prop instanceof Vec3) {
    return prop;
  }
  if (isWritable(prop)) {
    return get(prop);
  }
  return new Vec3(prop.x, prop.y, prop.z);
}

export function syncVec3FromProp(
  target: Vec3,
  prop: Vec3Like | Writable<Vec3> | undefined
): void {
  if (!prop) {
    return;
  }
  if (Array.isArray(prop)) {
    target.set(prop[0], prop[1], prop[2]);
  } else if (isWritable(prop)) {
    target.copy(get(prop));
  } else {
    target.copy(prop as Vec3);
  }
}
export function quaternionEulerProp(
  prop: Vec3Like | Writable<Vec3> | undefined
): Quaternion | undefined {
  const vec3 = vec3FromProp(prop);
  if (!vec3) {
    return undefined;
  }
  const quaternion = new Quaternion();
  quaternion.setFromEuler(vec3.x, vec3.y, vec3.z, "YZX");
  return quaternion;
}

export function syncQuaternionEulerProp(
  quaternion: Quaternion,
  prop: Vec3Like | Writable<Vec3> | undefined
) {
  const value = quaternionEulerProp(prop);
  if (value) {
    quaternion.copy(value);
  }
}
