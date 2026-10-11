import { Vec3, Quaternion, Body } from "cannon-es";
import type { Vec3Like, QuaternionLike, CannonContext } from "./types";
import { untrack } from "svelte";

export function syncId(
  context: CannonContext,
  body: Body,
  id: string | undefined,
) {
  const previous = untrack(() => context.bodyToId.get(body));
  if (previous) {
    if (previous === id) {
      return;
    }
    context.idToBody.delete(previous);
  }
  if (id) {
    context.bodyToId.set(body, id);
    context.idToBody.set(id, body);
  }
}

export function syncVec3(target: Vec3, value: Vec3Like | undefined): boolean {
  if (!value || target === value) {
    return false;
  }
  if (Array.isArray(value)) {
    target.set(value[0], value[1], value[2]);
  } else {
    target.copy(value as Vec3);
  }
  return true;
}

export function syncQuaternion(
  target: Quaternion,
  value: QuaternionLike | undefined,
  skipRef?: { euler: Vec3; skip: boolean },
): void {
  if (!value || target === value || skipRef?.skip) {
    if (skipRef) {
      skipRef.skip = false;
    }
    return;
  }
  if (value instanceof Quaternion) {
    target.copy(value);
  } else if (value instanceof Vec3) {
    if (
      skipRef?.euler.x === value.x &&
      skipRef.euler.y === value.y &&
      skipRef.euler.z === value.z
    ) {
      return;
    }
    target.setFromEuler(value.x, value.y, value.z, "XYZ");
  } else if (Array.isArray(value)) {
    if (value.length === 4) {
      target.set(value[0], value[1], value[2], value[3]);
    } else {
      target.setFromEuler(value[0], value[1], value[2], "XYZ");
    }
  } else if (typeof (value as Quaternion).w === "number") {
    target.set(value.x, value.y, value.z, (value as Quaternion).w);
  } else {
    target.setFromEuler(value.x, value.y, value.z, "XYZ");
  }
}
