import type { Vec3, World, Body } from "cannon-es";
import type { Writable } from "svelte/store";

export type Vec3Like =
  | { x: number; y: number; z: number }
  | [number, number, number];

export type ConnectableStore<T> = Writable<T> & {
  onStep(value: T): void; // A changed value based on the physics simulation.
  onSet(value: T): void; // An updated value that should be applied.
};
export type ConnectablePropVec3 = ConnectableStore<Vec3> | Vec3Like | undefined;

export type CannonContext = {
  world: World;
  body?: Body;
  bodyToId: Map<Body, string>;
  idToBody: Writable<Record<string, Body>>;
};
