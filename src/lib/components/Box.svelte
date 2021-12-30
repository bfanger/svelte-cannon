<script lang="ts">
  import { Box, Vec3, Quaternion } from "cannon-es";
  import { createVec3FromProp, updateVec3FromProp } from "../prop-fns";
  import type { Vec3Prop } from "../types";
  import Shape from "./Shape.svelte";

  export let size: Vec3Prop;
  export let offset: Vec3 | undefined = undefined;
  export let orientation: Quaternion | undefined = undefined;

  const shape = new Box(createVec3FromProp(size));

  $: {
    updateVec3FromProp(shape.halfExtents, size);
  }
</script>

<Shape {shape} {offset} {orientation}>
  <slot />
</Shape>
