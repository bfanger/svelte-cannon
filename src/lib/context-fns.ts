import { getContext, setContext } from "svelte";
import type { CannonContext } from "./types";

const CANNON = {};
export function setCannonContext(context: CannonContext) {
  setContext(CANNON, context);
}

export function getCannonContext(): CannonContext {
  const context = getContext<CannonContext>(CANNON);
  if (!context) {
    throw new Error("Missing context, not nested inside <World>");
  }
  return context;
}
