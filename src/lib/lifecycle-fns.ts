/* eslint-disable import/prefer-default-export */
import { onMount } from "svelte";
import { getCannonContext } from "./context-fns";

export function onPostStep(listener: () => void) {
  const { world } = getCannonContext();
  onMount(() => {
    world.addEventListener("postStep", listener);
    return () => {
      world.removeEventListener("postStep", listener);
    };
  });
}
