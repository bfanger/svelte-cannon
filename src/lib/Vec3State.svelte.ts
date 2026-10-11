import { Vec3 } from "cannon-es";
import { untrack } from "svelte";

export default class Vec3State {
  x = $state<number>(0);
  y = $state<number>(0);
  z = $state<number>(0);

  precision = 0.001;
  #reactive = true;

  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z);
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  syncWrite(vec3: Vec3) {
    if (
      !untrack(() => vec3.almostEquals(this as any as Vec3, this.precision))
    ) {
      this.#reactive = false;
      this.x = vec3.x;
      this.y = vec3.y;
      this.z = vec3.z;
      this.#reactive = true;
    }
  }

  syncRead(fn: (x: number, y: number, z: number) => void) {
    return $effect.root(() => {
      $effect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (this.x, this.y, this.z);
        if (this.#reactive) {
          untrack(() => fn(this.x, this.y, this.z));
        }
      });
    });
  }
}
