import type { Body } from "cannon-es";
import { getContext, setContext } from "svelte";
import { derived } from "svelte/store";
import type { Readable } from "svelte/store";
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
export function derivedBodies(
  idToBody: Readable<Record<string, Body>>,
  targets: [string, string]
): Readable<[Body, Body] | false>;
export function derivedBodies(
  idToBody: Readable<Record<string, Body>>,
  targets: string[]
): Readable<Body[] | false>;
export function derivedBodies(
  idToBody: Readable<Record<string, Body>>,
  targets: string[]
): Readable<Body[] | false> {
  return derived(idToBody, ($idToBody) => {
    const bodies = [];
    for (const target of targets) {
      const body = $idToBody[target];
      if (!body) {
        return false;
      }
      bodies.push(body);
    }
    return bodies;
  });
}
