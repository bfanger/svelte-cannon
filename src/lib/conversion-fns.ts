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
  value: QuaternionLike | undefined,
): Quaternion | undefined;
export function toQuaternion(
  value: QuaternionLike | undefined,
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
    quaternion.setFromEuler(euler.x, euler.y, euler.z, "XYZ");
  }
  return quaternion;
}

/**
 * Calculate the euler rotation (XYZ order) from the quaternion and set the values into the target Vec3
 * (cannon-es toEuler only supports YZX)
 */
export function quaternionToEuler(source: Quaternion, target: Vec3): void {
  // Quaternion to 4x4 matrix (only the relevant fields)
  const { x, y, z, w } = source;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;

  const mat0 = 1 - (yy + zz);
  const mat4 = xy - wz;
  const mat5 = 1 - (xx + zz);
  const mat6 = yz + wx;
  const mat8 = xz + wy;
  const mat9 = yz - wx;
  const mat10 = 1 - (xx + yy);

  // matrix 4 to euler XYZ

  target.y = Math.asin(Math.max(-1, Math.min(1, mat8)));

  if (Math.abs(mat8) < 0.9999999) {
    target.x = Math.atan2(-mat9, mat10);
    target.z = Math.atan2(-mat4, mat0);
  } else {
    target.x = Math.atan2(mat6, mat5);
    target.z = 0;
  }
}
