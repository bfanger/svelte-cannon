<script lang="ts">
  import { Cylinder } from "cannon-es";
  import type { Material } from "cannon-es";
  import type { Snippet } from "svelte";
  import type { Vec3Like, QuaternionLike } from "../../types";
  import Shape from "../Shape.svelte";

  type Props = {
    radiusTop?: number;
    radiusBottom?: number;
    height?: number;
    numSegments?: number;
    offset?: Vec3Like;
    orientation?: QuaternionLike;
    material?: Material;
    children?: Snippet;
  };
  let {
    radiusTop = 1,
    radiusBottom = 1,
    height = 1,
    numSegments = 8,
    offset,
    orientation,
    material,
    children,
  }: Props = $props();

  const shape = $derived.by(
    () => new Cylinder(radiusTop, radiusBottom, height, numSegments),
  );
</script>

<Shape {shape} {offset} {orientation} {material}>
  {@render children?.()}
</Shape>
