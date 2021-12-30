import { Vec3 } from "cannon-es";
import type { Quaternion } from "math/Quaternion";
import type { Vec3Prop } from "./types";

export function createVec3FromProp(prop: Vec3Prop): Vec3;
export function createVec3FromProp(
  prop: Vec3Prop | undefined
): Vec3 | undefined;
export function createVec3FromProp(
  prop: Vec3Prop | undefined
): Vec3 | undefined {
  if (Array.isArray(prop)) {
    return new Vec3(prop[0], prop[1], prop[2]);
  }
  return prop;
}

export function updateVec3FromProp(
  value: Vec3,
  prop: Vec3Prop | undefined
): void {
  if (Array.isArray(prop)) {
    value.set(prop[0], prop[1], prop[2]);
  } else if (prop) {
    value.copy(prop);
  }
}

export function updateFromEulerProp(
  quaternion: Quaternion,
  prop: Vec3Prop | undefined
) {
  if (Array.isArray(prop)) {
    quaternion.setFromEuler(prop[0], prop[1], prop[2], "YXZ");
  } else if (prop) {
    quaternion.setFromEuler(prop.x, prop.y, prop.z, "YXZ");
  }
}
