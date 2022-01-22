<script lang="ts">
  import { Cylinder, Material } from "cannon-es";
  import type { Vec3Like, QuaternionLike } from "../../types";
  import Shape from "../Shape.svelte";

  export let radiusTop = 1;
  export let radiusBottom = 1;
  export let height = 1;
  export let numSegments = 8;
  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;
  export let material: Material | undefined = undefined;

  $: shape = new Cylinder(radiusTop, radiusBottom, height, numSegments);
</script>

<Shape {shape} {offset} {orientation} {material}>
  <slot />
</Shape>
