import type { Body } from "cannon-es";
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
export function bodiesByIds(
  idToBody: Map<string, Body>,
  targets: [string, string],
): [Body, Body] | false;
export function bodiesByIds(
  idToBody: Map<string, Body>,
  targets: string[],
): Body[] | false;
export function bodiesByIds(
  idToBody: Map<string, Body>,
  targets: string[],
): Body[] | false {
  const bodies = [];
  for (const target of targets) {
    const body = idToBody.get(target);
    if (!body) {
      return false;
    }
    bodies.push(body);
  }
  return bodies;
}
