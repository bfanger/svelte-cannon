<script lang="ts">
  import { Box, Vec3, Quaternion } from "cannon-es";
  import { vec3FromProp, syncVec3FromProp } from "../prop-fns";
  import type { Vec3Like } from "../types";
  import Shape from "./Shape.svelte";

  export let size: Vec3Like;
  export let offset: Vec3 | undefined = undefined;
  export let orientation: Quaternion | undefined = undefined;

  const shape = new Box(vec3FromProp(size));

  $: {
    syncVec3FromProp(shape.halfExtents, size);
  }
</script>

<Shape {shape} {offset} {orientation}>
  <slot />
</Shape>
