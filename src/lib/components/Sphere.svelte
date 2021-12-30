<script lang="ts">
  import { Sphere } from "cannon-es";
  import Shape from "./Shape.svelte";

  export let radius: number;

  const shape = new Sphere(radius);

  $: {
    shape.radius = radius;
    shape.updateBoundingSphereRadius();
  }
</script>

<Shape {shape}>
  <slot />
</Shape>
