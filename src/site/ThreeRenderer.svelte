<script lang="ts">
  import * as THREE from "three";
  import { onMount } from "svelte";
  import { onPostStep } from "$lib/lifecycle-fns";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  export const scene = new THREE.Scene();

  let camera: THREE.PerspectiveCamera;
  let canvas: HTMLCanvasElement;
  let renderer: THREE.WebGLRenderer;
  let width: number;
  let height: number;

  $: renderer && renderer.setSize(width, height);
  $: if (camera) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  onMount(() => {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera(30, width / height, 0.5, 1000);
    camera.position.set(10, 4, 10);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    return () => {
      renderer.dispose();
    };
  });
  onPostStep(() => {
    renderer.render(scene, camera);
  });
</script>

<canvas
  bind:this={canvas}
  bind:clientWidth={width}
  bind:clientHeight={height}
/>

<style>
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
