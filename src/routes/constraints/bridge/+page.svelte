<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import Fab from "../../../site/Fab.svelte";

  const bridge = new THREE.Color(0xfa4203);
  const water = new THREE.Color(0x9abde3);
  const sky = new THREE.Color(0xb2dffe);
  const fog = new THREE.FogExp2(0xfdd8bb, 0.06);

  const N = 10;
  const half = (0.5 * N) / 2;
  const planks = Array(N)
    .fill(null)
    .map((_, i) => ({
      id: `plank${i}`,
      position: new CANNON.Vec3(0.5 * i - half, 1.5, 0),
    }));
</script>

<PE.World gravity={[0, -1, 0]}>
  <PE.LockConstraint for={planks.map((p) => p.id)} />

  <SC.Canvas background={sky} {fog}>
    <SC.Mesh
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={new THREE.PlaneGeometry(100, 100, 1, 1)}
      material={new THREE.MeshLambertMaterial({
        color: water,
        opacity: 0.5,
        transparent: true,
      })}
    />

    {#each Array(2) as _, i}
      <SC.Mesh
        position={[i ? -half - 0.4 - 0.05 : half, -2.75, -0.5]}
        geometry={new THREE.BoxGeometry(0.4, 8, 0.4)}
        material={new THREE.MeshLambertMaterial({ color: bridge })}
      />
      <SC.Mesh
        position={[i ? -half - 0.4 - 0.05 : half, -2.75, 0.5]}
        geometry={new THREE.BoxGeometry(0.4, 8, 0.4)}
        material={new THREE.MeshLambertMaterial({ color: bridge })}
      />
      <PE.Body id="stand{i}" position={[i ? -half - 0.2 : half - 0.3, 0.7, 0]}>
        <PE.Box size={[0.15, 0.1, 0.5]} />
        <SC.Mesh
          position={[i ? -half - 0.2 : half - 0.3, 0.7, 0]}
          geometry={new THREE.BoxGeometry(0.3, 0.2, 1)}
          material={new THREE.MeshLambertMaterial({ color: bridge })}
        />
      </PE.Body>
    {/each}

    {#each planks as plank (plank.id)}
      <PE.Body id={plank.id} bind:position={plank.position} mass={1}>
        <PE.Box size={[0.2, 0.075, 0.5]} />
      </PE.Body>

      <SC.Mesh
        position={plank.position.toArray()}
        geometry={new THREE.BoxGeometry(0.4, 0.15, 1)}
        material={new THREE.MeshLambertMaterial({
          color: bridge,
        })}
      />
    {/each}

    <SC.PerspectiveCamera position={[0, 2, 8]} />
    <SC.OrbitControls maxPolarAngle={Math.PI / 2.1} />
    <SC.AmbientLight intensity={0.7} />
    <SC.DirectionalLight position={[-10, -10, 5]} />
  </SC.Canvas>
</PE.World>
<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/constraints/bridge/%2Bpage.svelte"
/>
<svelte:head>
  <title>Bridge - LockConstraint example</title>
  <meta
    name="description"
    content="Rrecreation of the Lock demo from the https://pmndrs.github.io/cannon-es/examples/constraints"
  />
</svelte:head>
