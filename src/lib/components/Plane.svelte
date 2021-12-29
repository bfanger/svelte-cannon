<script lang="ts">
  import { Plane } from "cannon-es";
  import Shape from "./Shape.svelte";
</script>

<Shape shape={new Plane()}>
  <slot />
</Shape>
