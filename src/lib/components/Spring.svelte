<script lang="ts">
  import { Spring } from "cannon-es";
  import type { SpringOptions } from "cannon-es";
  import { onPostStep } from "../lifecycle-fns";
  import { bodiesByIds, getCannonContext } from "../context-fns";
  import type { Vec3Like } from "../types";
  import { toVec3 } from "../conversion-fns";

  type Props = {
    forA: string;
    forB: string;
    restLength?: number;
    stiffness?: number;
    damping?: number;
    localAnchorA?: Vec3Like;
    localAnchorB?: Vec3Like;
    worldAnchorA?: Vec3Like;
    worldAnchorB?: Vec3Like;
  };
  let {
    forA,
    forB,
    restLength = 1,
    stiffness = 100,
    damping = 1,
    localAnchorA = undefined,
    localAnchorB = undefined,
    worldAnchorA = undefined,
    worldAnchorB = undefined,
  }: Props = $props();
  const ctx = getCannonContext();

  let bodies = $derived(bodiesByIds(ctx.idToBody, [forA, forB]));
  let spring = $derived.by(() => {
    if (!bodies) {
      return undefined;
    }
    const options: SpringOptions = {
      restLength,
      stiffness,
      damping,
      localAnchorA: toVec3(localAnchorA),
      localAnchorB: toVec3(localAnchorB),
      worldAnchorA: toVec3(worldAnchorA),
      worldAnchorB: toVec3(worldAnchorB),
    };
    return new Spring(bodies[0], bodies[1], options);
  });

  onPostStep(() => {
    if (spring) {
      spring.applyForce();
    }
  });
</script>
