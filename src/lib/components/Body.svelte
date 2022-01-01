<script lang="ts">
  /**
   * https://pmndrs.github.io/cannon-es/docs/classes/Body.html
   */
  import { Body, Vec3 } from "cannon-es";
  import { onMount } from "svelte";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import type { ConnectablePropVec3 } from "../types";
  import { forwardEvents, onPostStep } from "../lifecycle-fns";
  import {
    vec3FromProp,
    syncVec3FromProp,
    quaternionEulerProp,
    syncQuaternionEulerProp,
    isWritable,
  } from "../prop-fns";

  export let mass: number | undefined = undefined;
  export let position: ConnectablePropVec3 = undefined;
  export let rotation: ConnectablePropVec3 = undefined;
  export let velocity: ConnectablePropVec3 = undefined;
  export let allowSleep = true;

  export const body = new Body({
    mass,
    position: vec3FromProp(position),
    quaternion: quaternionEulerProp(rotation),
    velocity: vec3FromProp(velocity),
    allowSleep,
  });

  const context = getCannonContext();
  setCannonContext({ ...context, body });

  $: if (typeof mass !== "undefined") {
    body.mass = mass;
  }
  $: syncVec3FromProp(body.position, position);
  $: positionStore = isWritable(position) ? position : undefined;
  $: if (positionStore) {
    positionStore.onSet = (v) => body.position.copy(v);
  }

  $: syncQuaternionEulerProp(body.quaternion, rotation);
  $: rotationStore = isWritable(rotation) ? rotation : undefined;
  $: if (rotationStore) {
    rotationStore.onSet = (v) => body.position.copy(v);
  }

  $: syncVec3FromProp(body.velocity, velocity);
  $: velocityStore = isWritable(velocity) ? velocity : undefined;
  $: if (velocityStore) {
    velocityStore.onSet = (v) => body.velocity.copy(v);
  }

  $: body.allowSleep = allowSleep;

  forwardEvents(body, "wakeup", "sleepy", "sleep", "collide");
  interface $$Events {
    wakeup: (e: CustomEvent) => void;
    sleepy: (e: CustomEvent) => void;
    sleep: (e: CustomEvent) => void;
    collide: (e: CustomEvent) => void;
  }

  onMount(() => {
    context.world.addBody(body);
    return () => {
      context.world.removeBody(body);
    };
  });
  const euler = new Vec3();
  onPostStep(() => {
    if (positionStore) {
      positionStore.onStep(body.position);
    }
    if (rotationStore) {
      body.quaternion.toEuler(euler, "YZX");
      rotationStore.onStep(euler);
    }
    if (velocityStore) {
      velocityStore.onStep(body.velocity);
    }
  });
</script>

<slot />
