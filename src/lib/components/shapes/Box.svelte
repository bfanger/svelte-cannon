<script lang="ts">
  import { Box } from "cannon-es";
  import type { Material } from "cannon-es";
  import { untrack } from "svelte";
  import type { Snippet } from "svelte";
  import { toVec3 } from "../../conversion-fns";
  import { syncVec3 } from "../../sync-fns";
  import type { Vec3Like, QuaternionLike } from "../../types";
  import Shape from "../Shape.svelte";

  type Props = {
    size: Vec3Like;
    offset?: Vec3Like;
    orientation?: QuaternionLike;
    material?: Material;
    children?: Snippet;
  };
  let { size, offset, orientation, material, children }: Props = $props();

  const shape = untrack(() => new Box(toVec3(size)));

  $effect(() => {
    syncVec3(shape.halfExtents, size);
    shape.updateConvexPolyhedronRepresentation();
    shape.updateBoundingSphereRadius();
  });
</script>

<Shape {shape} {offset} {orientation} {material}>
  {@render children?.()}
</Shape>
