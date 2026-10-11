<script lang="ts">
  import * as PE from "#lib";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  type Props = {
    x: number;
    y: number;
  };
  let { x, y }: Props = $props();

  let hit = $state(false);

  function oncollide() {
    hit = true;
  }
</script>

{#if hit === false}
  <PE.Body {oncollide} position={[-x, -y, -0.1]} isTrigger>
    <PE.Sphere radius={0.1} />
  </PE.Body>
  <SC.Mesh
    geometry={new THREE.SphereGeometry(0.1)}
    material={new THREE.MeshLambertMaterial({ color: 0xe3a486 })}
    position={[-x, -y, -0.4]}
    castShadow
  />
{/if}
