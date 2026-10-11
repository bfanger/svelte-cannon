<script lang="ts">
  import * as PE from "#lib";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import Wall from "./Wall.svelte";
  import PowerPill from "./PowerPill.svelte";
  import Pill from "./Pill.svelte";

  // 8 = wall
  // 1 = empty
  // 5 = power pill
  const level = [
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [8, 2, 2, 2, 2, 2, 2, 2, 2, 8],
    [8, 2, 8, 8, 2, 8, 8, 8, 2, 8],
    [8, 5, 2, 8, 2, 2, 2, 2, 2, 8],
    [8, 8, 2, 8, 2, 8, 1, 8, 8, 8],
    [8, 2, 2, 2, 2, 8, 1, 1, 1, 8],
    [8, 2, 8, 8, 8, 8, 8, 8, 1, 8],
    [8, 2, 2, 2, 2, 2, 2, 2, 2, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  ];
  const groundRotation: [number, number, number] = [-Math.PI, 0, 0];
  let weak = $state(false);
  function onPowerUp() {
    weak = true;
  }
</script>

<PE.Body rotation={groundRotation}>
  <PE.Plane />
  <SC.Mesh
    geometry={new THREE.PlaneGeometry(100, 100, 1, 1)}
    rotation={groundRotation}
    material={new THREE.MeshLambertMaterial({ color: 0x050505 })}
    receiveShadow
  />
</PE.Body>
{#each level as row, y}
  {#each row as type, x}
    {#if type === 8}
      <Wall {x} {y} {weak} />
    {:else if type === 5 && !weak}
      <PowerPill {x} {y} oncollide={onPowerUp} />
    {:else if type === 2}
      <Pill {x} {y} />
    {/if}
  {/each}
{/each}
