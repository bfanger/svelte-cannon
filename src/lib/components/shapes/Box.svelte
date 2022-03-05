<script lang="ts">
  import { Box } from "cannon-es";
  import type { Material } from "cannon-es";
  import { toVec3 } from "../../conversion-fns";
  import { syncVec3 } from "../../sync-fns";
  import type { Vec3Like, QuaternionLike } from "../../types";
  import Shape from "../Shape.svelte";

  export let size: Vec3Like;
  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;
  export let material: Material | undefined = undefined;

  const shape = new Box(toVec3(size));

  $: sync(size);

  function sync(options: Vec3Like) {
    syncVec3(shape.halfExtents, options);
    shape.updateConvexPolyhedronRepresentation();
    shape.updateBoundingSphereRadius();
  }
</script>

<Shape {shape} {offset} {orientation} {material}>
  <slot />
</Shape>
