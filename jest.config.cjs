module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
    "^.+\\.(js|ts)$": "babel-jest",
  },
  transformIgnorePatterns: ["/!node_modules\\/lodash-es/"],
};
