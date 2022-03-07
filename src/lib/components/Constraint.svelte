<script lang="ts">
  /**
   * https://pmndrs.github.io/cannon-es/docs/classes/Constraint.html
   */
  import { onDestroy } from "svelte";
  import type { Constraint } from "cannon-es";
  import { getCannonContext } from "../context-fns";

  export let constraint: Constraint | undefined = undefined;
  export let constraints: Constraint[] = [];

  const { world } = getCannonContext();

  let previous: Constraint[] = [];

  $: sync(constraint ? [constraint, ...constraints] : constraints);

  function sync(next: Constraint[]) {
    previous.forEach((c) => world.removeConstraint(c));
    next.forEach((c) => world.addConstraint(c));
    previous = [...next];
  }

  onDestroy(() => {
    previous.forEach((c) => world.removeConstraint(c));
  });
</script>
