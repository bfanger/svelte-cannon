<script lang="ts">
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import Hero from "../../site/pill-eater/Hero.svelte";
  import Level from "../../site/pill-eater/Level.svelte";
  import Fab from "../../site/Fab.svelte";
</script>

<SC.Canvas shadows={THREE.PCFSoftShadowMap} outputEncoding={THREE.sRGBEncoding}>
  <PE.World gravity={[0, 0, 9.81]} allowSleep>
    <Level />

    <Hero />
    <SC.PerspectiveCamera
      position={[-4, -5, -25]}
      target={[-4, -4, 0]}
      fov={30}
      near={0.5}
      far={1000}
    />
    <SC.AmbientLight color={0x666666} />
    <SC.DirectionalLight
      position={[5, 7, -20]}
      intensity={1.2}
      shadow={{
        camera: {
          left: -20,
          right: 20,
          top: 20,
          bottom: -20,
          far: 60,
          near: 20,
        },
        mapSize: [2048, 2048],
      }}
    />
  </PE.World>
</SC.Canvas>

<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/pill-eater/%2Bpage.svelte"
/>
<svelte:head>
  <title>Pill Eater</title>
  <meta name="description" content="Small mini game, Go get the power pill!" />
</svelte:head>
