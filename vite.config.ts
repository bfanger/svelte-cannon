import { existsSync } from "node:fs";
import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig, configDefaults } from "vitest/config";
import runesMode from "./src/runesMode.js";

const inDocker = existsSync("/.dockerenv");

export default defineConfig({
  plugins: [
    inDocker ? [] : devtoolsJson(),
    sveltekit({ adapter: adapter(), preprocess: runesMode() }),
  ],
  server: inDocker
    ? { host: true, watch: { usePolling: true, interval: 1000 } }
    : {
        cors: { origin: "*" },
      },
  css: { devSourcemap: true },
  test: {
    exclude: [...configDefaults.exclude, "package"],
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
});
