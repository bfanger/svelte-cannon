<script lang="ts">
  import { Quaternion, Sphere, Vec3 } from "cannon-es";
  import Shape from "./Shape.svelte";

  export let radius: number;
  export let offset: Vec3 | undefined = undefined;
  export let orientation: Quaternion | undefined = undefined;

  const shape = new Sphere(radius);

  $: {
    shape.radius = radius;
    shape.updateBoundingSphereRadius();
  }
</script>

<Shape {shape} {offset} {orientation}>
  <slot />
</Shape>
