<script lang="ts">
  import { Sphere } from "cannon-es";
  import type { Material } from "cannon-es";
  import { untrack } from "svelte";
  import type { Snippet } from "svelte";
  import Shape from "../Shape.svelte";
  import type { Vec3Like, QuaternionLike } from "../../types";

  type Props = {
    radius: number;
    offset?: Vec3Like;
    orientation?: QuaternionLike;
    material?: Material;
    children?: Snippet;
  };
  let {
    radius,
    offset = undefined,
    orientation = undefined,
    material = undefined,
    children = undefined,
  }: Props = $props();

  const shape = untrack(() => new Sphere(radius));

  $effect(() => {
    shape.radius = radius;
    shape.updateBoundingSphereRadius();
  });
</script>

<Shape {shape} {offset} {orientation} {material}>
  {@render children?.()}
</Shape>
