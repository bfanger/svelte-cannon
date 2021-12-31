const preprocess = require("svelte-preprocess");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(ts|svelte)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
  svelteOptions: {
    preprocess: preprocess(),
  },
};
