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
const eulerOrder = "YZX"; // cannon-es only supports _to_ "YZX"

export function toQuaternion(value: QuaternionLike): Quaternion;
export function toQuaternion(
  value: QuaternionLike | undefined
): Quaternion | undefined;
export function toQuaternion(
  value: QuaternionLike | undefined
): Quaternion | undefined {
  if (value instanceof Quaternion || value === undefined) {
    return value;
  }
  const quaternion = new Quaternion();
  if (Array.isArray(value) && value.length === 4) {
    quaternion.set(value[0], value[1], value[2], value[3]);
    return quaternion;
  }
  if (typeof (value as Quaternion).w === "number") {
    quaternion.copy(value as Quaternion);
  } else {
    const euler = toVec3(value);
    quaternion.setFromEuler(euler.x, euler.y, euler.z, eulerOrder);
  }
  return quaternion;
}
