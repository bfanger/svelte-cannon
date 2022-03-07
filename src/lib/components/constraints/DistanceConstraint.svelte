<script lang="ts">
  import { DistanceConstraint } from "cannon-es";
  import type { Body } from "cannon-es";
  import { bodiesFor } from "../../context-fns";
  import Constraint from "../Constraint.svelte";

  let targets: string[];
  export { targets as for };
  export let distance: number | undefined = undefined;
  export let maxForce = 1e6;

  const bodies = bodiesFor(targets);
  $: bodies.for(targets);

  $: $bodies && sync($bodies, { distance, maxForce });

  let constraints: DistanceConstraint[] = [];

  function sync(
    entries: Body[],
    _: {
      distance: number | undefined;
      maxForce: number;
    }
  ) {
    constraints = [];
    let previous: Body | undefined;
    for (const body of entries) {
      if (previous) {
        constraints.push(
          new DistanceConstraint(previous, body, distance, maxForce)
        );
      }
      previous = body;
    }
  }
</script>

<Constraint {constraints} />
