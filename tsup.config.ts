import { defineConfig } from 'tsup';

// Library build. CSS is not handled here: see scripts/build-css.js.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022',
  // react/jsx-runtime and react-dom/* are subpaths of the peers, so they are external too.
  external: [/^react($|\/)/, /^react-dom($|\/)/],
});
