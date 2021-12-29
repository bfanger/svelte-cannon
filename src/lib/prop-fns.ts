import { Vec3 } from "cannon-es";
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
  if (!prop) {
    return;
  }
  if (Array.isArray(prop)) {
    value.set(prop[0], prop[1], prop[2]);
  } else {
    value.copy(prop);
  }
}
