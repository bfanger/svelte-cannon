<script lang="ts">
  import { Plane, Quaternion, Vec3 } from "cannon-es";
  import Shape from "./Shape.svelte";

  export let offset: Vec3 | undefined = undefined;
  export let orientation: Quaternion | undefined = undefined;

  const shape = new Plane();
</script>

<Shape {shape} {offset} {orientation}>
  <slot />
</Shape>
