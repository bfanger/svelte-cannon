<script lang="ts">
  import { Sphere } from "cannon-es";
  import Shape from "../Shape.svelte";
  import type { Vec3Like, QuaternionLike } from "../../types";

  export let radius: number;
  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;

  const shape = new Sphere(radius);

  $: {
    shape.radius = radius;
    shape.updateBoundingSphereRadius();
  }
</script>

<Shape {shape} {offset} {orientation}>
  <slot />
</Shape>
