# Svelte Project Template

[Svelte](https://svelte.dev/) project preconfigured with:

- [SvelteKit](https://kit.svelte.dev/) ([Vite](https://vitejs.dev))
- [Typescript](http://typescriptlang.org)
- [Sass](https://sass-lang.com)
- [Prettier](https://prettier.io) & [Eslint](https://eslint.org)
- [Husky](https://typicode.github.io/husky/) & [Lint-staged](https://github.com/okonet/lint-staged)
- [Jest](https://jestjs.io) \*1
- [Storybook](https://storybook.js.org/docs/6.4/svelte/writing-stories/introduction) \*1

\*1: To keep the installation speedy Jest and Storybook are disabled by default.

## Initial setup

```sh
npx degit "github.com/bfanger/svelte-project-template#main" my-svelte-project
cd my-svelte-project
git init && git add .
yarn             # or  npm install
yarn dev --open  # or  npm run dev
```

## Enabling Testing & Storybook

```sh
node ./enable-testing.js
yarn  # or  npm install
```

- Creates the configuration files
- Creates an example unittest
- Creates an example storybook story
- Installs ~734 additional modules

## Linting

```sh
yarn lint  # or  npm run lint
```

## Build

```sh
yarn build  # or  npm run build
npx serve -s build
```
