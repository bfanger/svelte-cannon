<script lang="ts">
  import { Plane } from "cannon-es";
  import Shape from "./Shape.svelte";
  import type { Vec3Like, QuaternionLike } from "../types";

  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;

  const shape = new Plane();
</script>

<Shape {shape} {offset} {orientation}>
  <slot />
</Shape>
