<script lang="ts">
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  export let x: number;
  export let y: number;

  let hit = false;

  function onHit() {
    hit = true;
  }
</script>

{#if hit === false}
  <PE.Body on:collide={onHit} position={[-x, -y, -0.1]} isTrigger>
    <PE.Sphere radius={0.1} />
  </PE.Body>
  <SC.Mesh
    geometry={new THREE.SphereGeometry(0.1)}
    material={new THREE.MeshLambertMaterial({ color: 0xe3a486 })}
    position={[-x, -y, -0.4]}
    castShadow
  />
{/if}
