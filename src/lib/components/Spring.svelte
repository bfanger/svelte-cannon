<script lang="ts">
  import { Body, Spring } from "cannon-es";
  import type { SpringOptions } from "cannon-es";
  import { onPostStep } from "../lifecycle-fns";
  import { derivedBodies, getCannonContext } from "../context-fns";
  import type { Vec3Like } from "../types";
  import { toVec3 } from "../conversion-fns";

  export let forA: string;
  export let forB: string;
  export let restLength = 1;
  export let stiffness = 100;
  export let damping = 1;
  export let localAnchorA: Vec3Like | undefined = undefined;
  export let localAnchorB: Vec3Like | undefined = undefined;
  export let worldAnchorA: Vec3Like | undefined = undefined;
  export let worldAnchorB: Vec3Like | undefined = undefined;

  const context = getCannonContext();
  $: bodies = derivedBodies(context.idToBody, [forA, forB]);

  $: sync($bodies, {
    restLength,
    damping,
    stiffness,
    localAnchorA: toVec3(localAnchorA),
    localAnchorB: toVec3(localAnchorB),
    worldAnchorA: toVec3(worldAnchorA),
    worldAnchorB: toVec3(worldAnchorB),
  });

  let spring: Spring | undefined;
  // eslint-disable-next-line no-undef
  function sync(values: [Body, Body] | false, options: SpringOptions) {
    if (!values) {
      spring = undefined;
      return;
    }
    spring = new Spring(values[0], values[1], options);
  }
  onPostStep(() => {
    if (spring) {
      spring.applyForce();
    }
  });
</script>
