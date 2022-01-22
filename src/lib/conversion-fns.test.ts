import { Quaternion, Vec3 } from "cannon-es";
import { describe, it, expect } from "vitest";
import { quaternionToEuler } from "./conversion-fns";

describe("conversion-fns", () => {
  describe("euler <=> quaternion", () => {
    it("recalculating should result in the same rotation", () => {
      const quaternion = new Quaternion();
      quaternion.setFromEuler(0.5, 1, 1.5);

      const euler = new Vec3();
      quaternionToEuler(quaternion, euler);

      expect(euler.x).toBeCloseTo(0.5, 0.001);
      expect(euler.y).toBeCloseTo(1, 0.001);
      expect(euler.z).toBeCloseTo(1.5, 0.001);
    });
  });
});
