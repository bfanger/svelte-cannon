<script lang="ts">
  import { tweened } from "svelte/motion";
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { onMount } from "svelte";

  export let x: number;
  export let y: number;

  const size = tweened(0.2, { duration: 300 });
  onMount(() => {
    const timer = setInterval(() => {
      $size = 0.25;
      setTimeout(() => {
        $size = 0.15;
      }, 200);
    }, 800);
    return () => {
      clearInterval(timer);
    };
  });
</script>

<PE.Body on:collide position={[-x, -y, -0.4]} isTrigger>
  <PE.Sphere radius={$size} />
</PE.Body>
<SC.Mesh
  geometry={new THREE.SphereGeometry($size)}
  material={new THREE.MeshLambertMaterial({ color: 0xe3a486 })}
  position={[-x, -y, -0.4]}
  castShadow
/>
