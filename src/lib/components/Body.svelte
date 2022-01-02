<script lang="ts">
  /**
   * https://pmndrs.github.io/cannon-es/docs/classes/Body.html
   */
  import { Body, Vec3 } from "cannon-es";
  import { onMount } from "svelte";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import type { QuaternionLike, Vec3Like } from "../types";
  import { forwardEvents, onPostStep } from "../lifecycle-fns";
  import { toVec3, toQuaternion } from "../conversion-fns";
  import { syncVec3, syncId, syncQuaternion } from "../sync-fns";

  export let id: string | undefined = undefined;
  export let mass = 0;
  export let position: Vec3Like | undefined = undefined;
  export let rotation: QuaternionLike | undefined = undefined;
  export let velocity: Vec3Like | undefined = undefined;
  export let allowSleep = true;

  export const body = new Body({
    mass,
    position: toVec3(position),
    quaternion: toQuaternion(rotation),
    velocity: toVec3(velocity),
    allowSleep,
  });

  if (position !== undefined) {
    position = body.position;
  }

  const context = getCannonContext();
  setCannonContext({ ...context, body });

  $: syncId(context, body, id);
  $: body.mass = mass;
  $: syncVec3(body.position, position);
  const skipRotationRef = { skip: false };
  $: syncQuaternion(body.quaternion, rotation, skipRotationRef);
  $: syncVec3(body.velocity, velocity);
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
      if (id) {
        context.bodyToId.delete(body);
        context.idToBody.update(($idToBody) => {
          if ($idToBody[id as string] === body) {
            // eslint-disable-next-line no-param-reassign
            delete $idToBody[id as string];
          }
          return $idToBody;
        });
      }
    };
  });
  onPostStep(() => {
    if (body.sleepState === Body.SLEEPING) {
      return;
    }
    if (position instanceof Vec3) {
      position = body.position;
    }
    if (rotation instanceof Vec3) {
      body.quaternion.toEuler(rotation, "YZX");
      skipRotationRef.skip = true;
      rotation = rotation;
    }
    if (velocity) {
      velocity = body.velocity;
    }
  });
</script>

<slot />
