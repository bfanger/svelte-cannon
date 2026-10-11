import type { EventTarget } from "cannon-es";
import { onMount } from "svelte";
import { getCannonContext } from "./context-fns";

export function onPreStep(listener: () => void) {
  const { world } = getCannonContext();
  onMount(() => {
    world.addEventListener("preStep", listener);
    return () => {
      world.removeEventListener("preStep", listener);
    };
  });
}
export function onPostStep(listener: () => void) {
  const { world } = getCannonContext();
  onMount(() => {
    world.addEventListener("postStep", listener);
    return () => {
      world.removeEventListener("postStep", listener);
    };
  });
}

/**
 * Attach a possible event listener and return a teardown function.
 */
export function listenTo(
  target: EventTarget,
  event: string,
  handler?: (event: any) => void,
) {
  if (!handler) {
    return undefined;
  }
  target.addEventListener(event, handler);
  return () => target.removeEventListener(event, handler);
}
