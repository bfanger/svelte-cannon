// eslint-disable-next-line import/no-extraneous-dependencies
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, UserConfigExport } from "vite";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    global: true,
    environment: "jsdom",
  },
} as UserConfigExport);
