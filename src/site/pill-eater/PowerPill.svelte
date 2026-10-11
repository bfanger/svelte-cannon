<script lang="ts">
  import { Tween } from "svelte/motion";
  import * as PE from "#lib";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { onMount } from "svelte";

  type Props = {
    x: number;
    y: number;
    oncollide: () => void;
  };
  let { x, y, oncollide }: Props = $props();

  const size = new Tween(0.2, { duration: 300 });
  onMount(() => {
    const timer = setInterval(() => {
      void size.set(0.25);
      setTimeout(() => {
        void size.set(0.15);
      }, 200);
    }, 800);
    return () => {
      clearInterval(timer);
    };
  });
</script>

<PE.Body position={[-x, -y, -0.4]} isTrigger on:collide={oncollide}>
  <PE.Sphere radius={size.current} />
</PE.Body>
<SC.Mesh
  geometry={new THREE.SphereGeometry(size.current)}
  material={new THREE.MeshLambertMaterial({ color: 0xe3a486 })}
  position={[-x, -y, -0.4]}
  castShadow
/>
