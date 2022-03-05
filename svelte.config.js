import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    vite: {
      build: {
        chunkSizeWarningLimit: 700,
      },
    },
  },
};
