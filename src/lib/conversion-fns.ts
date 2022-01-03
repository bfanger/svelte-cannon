import { Vec3, Quaternion } from "cannon-es";
import type { Vec3Like, QuaternionLike } from "./types";

export function toVec3(value: Vec3Like): Vec3;
export function toVec3(value: Vec3Like | undefined): Vec3 | undefined;
export function toVec3(value: Vec3Like | undefined): Vec3 | undefined {
  if (value instanceof Vec3 || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return new Vec3(value[0], value[1], value[2]);
  }
  return new Vec3(value.x, value.y, value.z);
}

export function toQuaternion(value: QuaternionLike): Quaternion;
export function toQuaternion(
  value: Vec3Like | undefined
): Quaternion | undefined;
export function toQuaternion(
  value: Vec3Like | undefined
): Quaternion | undefined {
  if (value instanceof Quaternion || value === undefined) {
    return value;
  }
  // @todo Implement for non-euler QuaternionLike's
  const euler = toVec3(value);
  if (euler === undefined) {
    return undefined;
  }
  const quaternion = new Quaternion();
  quaternion.setFromEuler(euler.x, euler.y, euler.z, "YZX");
  return quaternion;
}
