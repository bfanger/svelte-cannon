import { sveltekit } from "@sveltejs/kit/vite";
import { configDefaults, type UserConfig } from "vitest/config";

const config: UserConfig = {
  plugins: [sveltekit()],
  test: {
    exclude: [...configDefaults.exclude, "package"],
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
};

export default config;
