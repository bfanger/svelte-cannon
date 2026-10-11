<script lang="ts">
  import { Plane } from "cannon-es";
  import type { Material } from "cannon-es";
  import type { Snippet } from "svelte";
  import Shape from "../Shape.svelte";
  import type { Vec3Like, QuaternionLike } from "../../types";

  type Props = {
    offset?: Vec3Like;
    orientation?: QuaternionLike;
    material?: Material;
    children?: Snippet;
  };
  let { offset, orientation, material, children }: Props = $props();

  const shape = new Plane();
</script>

<Shape {shape} {offset} {orientation} {material}>
  {@render children?.()}
</Shape>
