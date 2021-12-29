import { readable } from "svelte/store";

const raf = readable(performance.now(), (set) => {
  let handle: ReturnType<typeof requestAnimationFrame>;

  function update() {
    set(performance.now());
    handle = requestAnimationFrame(update);
  }
  handle = requestAnimationFrame(update);

  return () => {
    cancelAnimationFrame(handle);
  };
});

export default raf;
