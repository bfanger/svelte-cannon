import type { EventTarget } from "cannon-es";
import { createEventDispatcher, onMount } from "svelte";
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
 * Forward events from Cannon to Svelte
 */
export function forwardEvents(target: EventTarget, ...events: string[]) {
  const dispatch = createEventDispatcher();
  function forward(event: { type: string }) {
    dispatch(event.type, event);
  }
  onMount(() => {
    events.forEach((event) => {
      target.addEventListener(event, forward);
    });
    return () => {
      events.forEach((event) => {
        target.removeEventListener(event, forward);
      });
    };
  });
}
