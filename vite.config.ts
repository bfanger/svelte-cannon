import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  build: {
    chunkSizeWarningLimit: 700,
  },
};

export default config;
