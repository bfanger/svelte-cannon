<script lang="ts">
  import { DistanceConstraint } from "cannon-es";
  import type { Body } from "cannon-es";
  import { derivedBodies, getCannonContext } from "../../context-fns";
  import Constraint from "../Constraint.svelte";
  import { writableTargets } from "$lib/store-fns";

  let targets: string[];
  export { targets as for };
  export let distance: number | undefined = undefined;
  export let maxForce = 1e6;

  const { idToBody } = getCannonContext();

  const changedTargets = writableTargets(targets);
  $: changedTargets.set(targets);

  $: bodies = derivedBodies(idToBody, $changedTargets);
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
