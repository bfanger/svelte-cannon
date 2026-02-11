import { Vec3 } from "cannon-es";
import { readable, writable } from "svelte/store";
import type { Readable, Writable } from "svelte/store";
import type { Vec3Like, Dpad } from "./types";
import { toVec3 } from "./conversion-fns";

type Vec3Writable = Writable<Vec3> & {
  precision: number;
};
export function writableVec3(): Vec3Writable;
export function writableVec3(vec3: Vec3Like): Vec3Writable;
export function writableVec3(x: number, y: number, z: number): Vec3Writable;
export function writableVec3(
  x?: Vec3Like | number,
  y?: number,
  z?: number,
): Vec3Writable {
  const $value = new Vec3();
  if (typeof y !== "undefined") {
    $value.set(x as number, y, z!);
  } else if (typeof x !== "undefined") {
    if (Array.isArray(x)) {
      $value.set(x[0], x[1], x[2]);
    } else {
      $value.copy(x as unknown as Vec3);
    }
  }
  const value = writable($value) as Vec3Writable;

  const store = {
    subscribe: value.subscribe,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    set(x: Vec3Like | number, y?: number, z?: number) {
      if (
        x !== $value &&
        x instanceof Vec3 &&
        $value.almostEquals(x, store.precision)
      ) {
        return;
      }
      if (typeof y !== "undefined") {
        $value.set(x as number, y, z!);
      } else if (Array.isArray(x)) {
        $value.set(x[0], x[1], x[2]);
      } else {
        $value.copy(x as Vec3);
      }
      value.set($value);
    },
    update(updater: (val: Vec3) => Vec3Like) {
      value.set(toVec3(updater($value)));
    },
    precision: 0.001,
  };
  return store;
}

export function createDpad(
  keyMap: Record<string, keyof Dpad> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    a: "left",
    s: "down",
    d: "right",
  },
): Readable<Dpad> {
  const pressed: Dpad = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  const store = readable(pressed, (set) => {
    function onKeydown(e: KeyboardEvent) {
      const direction = keyMap[e.key];
      if (direction && !pressed[direction]) {
        pressed[direction] = true;
        set(pressed);
      }
    }
    function onKeyup(e: KeyboardEvent) {
      const direction = keyMap[e.key];
      if (direction && pressed[direction]) {
        pressed[direction] = false;
        set(pressed);
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKeydown);
      window.addEventListener("keyup", onKeyup);
      return () => {
        window.removeEventListener("keydown", onKeydown);
        window.removeEventListener("keyup", onKeyup);
      };
    }
    return undefined;
  });
  return store;
}
