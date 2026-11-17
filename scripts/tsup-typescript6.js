// Preloaded by build:lib only. tsup 9 builds type definitions through the TypeScript compiler API,
// which TypeScript 7 (this repo's compiler) no longer ships. Microsoft's compatibility package
// @typescript/typescript6 carries that API. This hook sends tsup's `typescript` lookups to it,
// and nothing else: `npm run lint` and Storybook keep using TypeScript 7.
// Delete this file, and the --import in build:lib, once tsup supports TypeScript 7.
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'typescript' && context.parentURL?.includes('/node_modules/tsup/')) {
      return next('@typescript/typescript6', context);
    }
    return next(specifier, context);
  },
});
