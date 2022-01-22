<script lang="ts">
  import { Particle } from "cannon-es";
  import Shape from "../Shape.svelte";
  import type { Vec3Like } from "../../types";

  export let offset: Vec3Like | undefined = undefined;

  const shape = new Particle();
</script>

<Shape {shape} {offset}>
  <slot />
</Shape>
