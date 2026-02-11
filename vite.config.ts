import { sveltekit } from "@sveltejs/kit/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [devtoolsJson(), sveltekit()],
  css: { devSourcemap: true },
  test: {
    exclude: [...configDefaults.exclude, "package"],
  },
  build: {
    // chunkSizeWarningLimit: 700,
  },
});
