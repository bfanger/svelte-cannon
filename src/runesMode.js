//@ts-check
import { fileURLToPath } from "node:url";
import path from "node:path";

/**
 * Preprocessor that inject <svelte:options runes /> into Svelte components that don't have a <svelte:options /> tag.
 * Simulates: `compilerOptions: { runes: true }` but doesn't force this on components inside node_modules.
 */
export default function runesMode() {
  const srcFolder = path.dirname(fileURLToPath(import.meta.url));
  /** @type {import('svelte/compiler').PreprocessorGroup} */
  const processor = {
    name: "runesMode",
    markup({ content, filename }) {
      if (
        filename?.startsWith(srcFolder) &&
        !content.includes("<svelte:options")
      ) {
        content += `\n<svelte:options runes />`;
      }
      return { code: content };
    },
  };
  return processor;
}
