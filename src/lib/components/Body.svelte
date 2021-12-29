<script lang="ts">
  import { Body, Quaternion } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { getWorldContext } from "../context-fns";
  import {
    createVec3FromPropStore,
    createQuaternionStore,
  } from "$lib/stores/simulated-stores";
  import type { Vec3Prop } from "$lib/types";
  import { createVec3FromProp, updateVec3FromProp } from "$lib/prop-fns";

  const world = getWorldContext();

  export let mass = 0;
  export let position: Vec3Prop | undefined = undefined;
  export let quaternion: Quaternion | undefined = undefined;
  export let euler: Vec3Prop | undefined = undefined;

  const body = new Body({ mass, position: createVec3FromProp(position) });
  setContext("cannon/body", body);

  $: body.mass = mass;
  $: updateVec3FromProp(body.position, position);
  $: euler && updateEuler(euler);

  const positionStore = createVec3FromPropStore(body, "position");
  $: quaternion && body.quaternion.copy(quaternion);
  const quaternionStore = createQuaternionStore(body, "quaternion");

  function updateEuler(next: Vec3Prop) {
    if (Array.isArray(next)) {
      body.quaternion.setFromEuler(next[0], next[1], next[2], "YXZ");
    } else {
      body.quaternion.setFromEuler(next.x, next.y, next.z, "YXZ");
    }
  }
  onMount(() => {
    world.addBody(body);
    return () => {
      world.removeBody(body);
    };
  });
</script>

<slot {body} position={$positionStore} quaternion={$quaternionStore} />
