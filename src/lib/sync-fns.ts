import { Vec3, Quaternion, Body } from "cannon-es";
import { get } from "svelte/store";
import type { Vec3Like, QuaternionLike, CannonContext } from "./types";

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

const eulerOrder = "YZX"; // cannon-es only supports _to_ "YZX"

export function syncQuaternion(
  target: Quaternion,
  value: QuaternionLike | undefined,
  skipRef?: { euler: Vec3; skip: boolean }
): void {
  if (!value || target === value || skipRef?.skip) {
    if (skipRef) {
      // eslint-disable-next-line no-param-reassign
      skipRef.skip = false;
    }
    return;
  }
  if (value instanceof Quaternion) {
    target.copy(value);
  } else if (value instanceof Vec3) {
    if (
      skipRef &&
      skipRef.euler.x === value.x &&
      skipRef.euler.y === value.y &&
      skipRef.euler.z === value.z
    ) {
      return;
    }
    target.setFromEuler(value.x, value.y, value.z, eulerOrder);
  } else if (Array.isArray(value)) {
    if (value.length === 4) {
      target.set(value[0], value[1], value[2], value[3]);
    } else {
      target.setFromEuler(value[0], value[1], value[2], eulerOrder);
    }
  } else if (typeof (value as Quaternion).w === "number") {
    target.set(value.x, value.y, value.z, (value as Quaternion).w);
  } else {
    target.setFromEuler(value.x, value.y, value.z, eulerOrder);
  }
}
