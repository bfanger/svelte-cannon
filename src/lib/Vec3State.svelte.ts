import { Vec3 } from "cannon-es";

export default class Vec3State {
  x = $state<number>(0);
  y = $state<number>(0);
  z = $state<number>(0);

  precision = 0.001;
  #processing: boolean;
  #cannon: Vec3;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.#cannon = new Vec3(x, y, z);
    this.#processing = false;
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.#cannon.set(x, y, z);
    this.#processing = false;
  }

  copy(vec3: { x: number; y: number; z: number }) {
    this.x = vec3.x;
    this.y = vec3.y;
    this.z = vec3.z;
    this.#cannon.copy(vec3 as Vec3);
    this.#processing = false;
  }

  toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  _fromPhysics(vec3: Vec3) {
    if (!this.#cannon.almostEquals(vec3, this.precision)) {
      this.#processing = true;
      this.x = vec3.x;
      this.y = vec3.y;
      this.z = vec3.z;
      this.#cannon.copy(vec3);
    }
  }

  _toPhysics(target: { set: (x: number, y: number, z: number) => void }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (this.x, this.y, this.z);
    if (!this.#processing) {
      target.set(this.x, this.y, this.z);
      this.#processing = false;
    }
  }
}
