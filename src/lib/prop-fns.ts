import { Vec3, Quaternion, Body } from "cannon-es";
import { get } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Vec3Like, CannonContext, ConnectablePropVec3 } from "./types";

export function isWritable<T>(prop: any): prop is Writable<T> {
  return !!(
    prop &&
    typeof prop.subscribe === "function" &&
    typeof prop.set === "function"
  );
}

export function vec3FromProp(value: Vec3Like): Vec3;
export function vec3FromProp(value: ConnectablePropVec3): Vec3 | undefined;
export function vec3FromProp(value: ConnectablePropVec3): Vec3 | undefined {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return new Vec3(value[0], value[1], value[2]);
  }
  if (value instanceof Vec3) {
    return value;
  }
  if (isWritable(value)) {
    return get(value);
  }
  return new Vec3(value.x, value.y, value.z);
}

export function syncVec3FromProp(
  target: Vec3,
  value: ConnectablePropVec3
): void {
  if (!value) {
    return;
  }
  if (Array.isArray(value)) {
    target.set(value[0], value[1], value[2]);
  } else if (isWritable(value)) {
    target.copy(get(value));
  } else {
    target.copy(value as Vec3);
  }
}
export function quaternionEulerProp(
  value: ConnectablePropVec3
): Quaternion | undefined {
  const vec3 = vec3FromProp(value);
  if (!vec3) {
    return undefined;
  }
  const quaternion = new Quaternion();
  quaternion.setFromEuler(vec3.x, vec3.y, vec3.z, "YZX");
  return quaternion;
}

export function syncQuaternionEulerProp(
  quaternion: Quaternion,
  value: ConnectablePropVec3
) {
  const converted = quaternionEulerProp(value);
  if (converted) {
    quaternion.copy(converted);
  }
}

export function syncId(
  context: CannonContext,
  body: Body,
  id: string | undefined
) {
  const previous = context.bodyToId.get(body);
  const $idToBody = get(context.idToBody);
  if (previous) {
    delete $idToBody[previous];
  }
  if (id) {
    context.bodyToId.set(body, id);
    $idToBody[id] = body;
  }
  if (previous || id) {
    context.idToBody.set($idToBody);
  }
}
