import type { World, Body } from "cannon-es";
import type { Writable } from "svelte/store";

export type Vec3Like =
  | { x: number; y: number; z: number }
  | [number, number, number];

export type QuaternionLike =
  | { x: number; y: number; z: number; w: number }
  | [number, number, number]
  | Vec3Like; // Euler

export type CannonContext = {
  world: World;
  body?: Body;
  bodyToId: Map<Body, string>;
  idToBody: Writable<Record<string, Body>>;
};

export type Dpad = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};
