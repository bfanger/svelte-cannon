import { Vec3 } from "cannon-es";
import { get } from "svelte/store";
import { writableVec3 } from "./store-fns";

describe("store-fns", () => {
  describe("writableVec3", () => {
    it("should accept x,y,z as arguments", () => {
      const position = writableVec3(1, 2, 3);
      const $position = get(position);
      expect($position).toBeInstanceOf(Vec3);
      expect($position.toString()).toBe("1,2,3");
    });
    it("should accept Vec3 as argument", () => {
      const position = writableVec3([1, 2, 3]);
      const $position = get(position);
      expect($position).toBeInstanceOf(Vec3);
      expect($position.toString()).toBe("1,2,3");
    });
    it("should accept an array as argument", () => {
      const position = writableVec3(new Vec3(1, 2, 3));
      const $position = get(position);
      expect($position).toBeInstanceOf(Vec3);
      expect($position.toString()).toBe("1,2,3");
    });
    it("should accept any object with x,y,z properties as argument", () => {
      const position = writableVec3({ x: 1, y: 2, z: 3 });
      const $position = get(position);
      expect($position).toBeInstanceOf(Vec3);
      expect($position.toString()).toBe("1,2,3");
    });
    it("should accept no arguments", () => {
      const position = writableVec3();
      const $position = get(position);
      expect($position).toBeInstanceOf(Vec3);
      expect($position.toString()).toBe("0,0,0");
    });
  });
});
