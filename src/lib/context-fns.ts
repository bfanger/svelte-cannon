import type { World, Body } from "cannon-es";
import { getContext } from "svelte";
import type { Readable } from "svelte/store";

export function getWorldContext() {
  const world = getContext<World>("cannon/world");
  if (!world) {
    throw new Error(
      "Missing context, must be nested inside a <World> component"
    );
  }
  return world;
}

export function getStepContext() {
  const step = getContext<Readable<void>>("cannon/step");
  if (!step) {
    throw new Error(
      "Missing context, must be nested inside a <World> component"
    );
  }
  return step;
}

export function getBodyContext() {
  const body = getContext<Body>("cannon/body");
  if (!body) {
    throw new Error(
      "Missing context, must be nested inside a <Body> component"
    );
  }
  return body;
}
