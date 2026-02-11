<script lang="ts">
  import { LockConstraint } from "cannon-es";
  import type { Body } from "cannon-es";
  import { bodiesFor } from "../../context-fns";
  import Constraint from "../Constraint.svelte";

  let targets: string[];
  export { targets as for };
  export let maxForce = 1e6;

  const bodies = bodiesFor(targets);
  $: bodies.for(targets);

  $: {
    if ($bodies) {
      sync($bodies, { maxForce });
    }
  }

  let constraints: LockConstraint[] = [];

  function sync(entries: Body[], options: { maxForce: number }) {
    let previous: Body | undefined;
    constraints = [];
    for (const body of entries) {
      if (previous) {
        constraints.push(new LockConstraint(previous, body, options));
      }
      previous = body;
    }
  }
</script>

<Constraint {constraints} />
