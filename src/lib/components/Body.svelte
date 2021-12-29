<script lang="ts">
  import { Body, Vec3 } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { getWorldContext } from "../context-fns";
  import { fromPosition } from "$lib/stores/simulated-stores";

  const world = getWorldContext();

  export let mass = 0;
  export let euler: undefined | Vec3 = undefined;
  export let position: undefined | Vec3 = undefined;

  const body = new Body({ mass });
  setContext("cannon/body", body);

  $: body.mass = mass;
  $: euler && body.quaternion.setFromEuler(euler.x, euler.y, euler.z);
  $: position && body.position.copy(position);
  const positionStore = fromPosition(body);

  onMount(() => {
    world.addBody(body);

    return () => {
      world.removeBody(body);
    };
  });
</script>

<slot {body} position={$positionStore} />
