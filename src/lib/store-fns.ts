import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import type { Dpad } from "./types";

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
