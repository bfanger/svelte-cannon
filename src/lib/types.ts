import type { World, Body, Shape } from "cannon-es";

export type Vec3Like =
  { x: number; y: number; z: number } | [number, number, number];

export type QuaternionLike =
  | { x: number; y: number; z: number; w: number }
  | [number, number, number, number] // Quaternion XYZW
  | Vec3Like; // Euler YZX

export type CannonContext = {
  world: World;
  body?: Body;
  shape?: Shape;
  bodyToId: Map<Body, string>;
  idToBody: Map<string, Body>;
};

export type Dpad = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};
