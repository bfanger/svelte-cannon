import type { World, Body } from "cannon-es";
import { getContext } from "svelte";
import type { Readable } from "svelte/store";

export function getWorldContext() {
  const world = getContext<World>("cannon/world");
  if (!world) {
    throw new Error(
      "Missing world context, must be nested inside a <World> component"
    );
  }
  return world;
}

export function getPostStepContext() {
  const context = getContext<Readable<void>>("cannon/postStep");
  if (!context) {
    throw new Error(
      "Missing postStep context, must be nested inside a <World> component"
    );
  }
  return context;
}

export function getBodyContext() {
  const context = getContext<Body>("cannon/body");
  if (!context) {
    throw new Error(
      "Missing body context, must be nested inside a <Body> component"
    );
  }
  return context;
}
