// Writes dist/styles.css (every component stylesheet, inlined from src/styles.css),
// dist/tokens.css (every token mode from build/css/) and dist/fonts.css (the opt-in Google Fonts
// imports, copied from src/fonts.css). Runs after build:tokens and build:lib.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DIST = 'dist';
// Same order Storybook loads them: :root, then dark, then the language modes.
const TOKEN_FILES = ['tokens.css', 'tokens-dark.css', 'tokens-burmese.css', 'tokens-english.css'];

function inline(file, seen = new Set()) {
  const path = resolve(file);
  if (seen.has(path)) throw new Error(`Circular @import: ${file}`);
  seen.add(path);
  return readFileSync(path, 'utf8').replace(
    /^@import\s+(?:url\()?['"]([^'"]+)['"]\)?\s*;\s*$/gm,
    (_, rel) => {
      if (/^[a-z]+:/i.test(rel)) throw new Error(`Remote @import not allowed in ${file}: ${rel}`);
      return `/* ${rel} */\n${inline(resolve(dirname(path), rel), seen).trim()}\n`;
    },
  );
}

if (!existsSync(DIST)) throw new Error('dist/ is missing. Run build:lib first.');
mkdirSync(DIST, { recursive: true });

writeFileSync(`${DIST}/styles.css`, inline('src/styles.css'));

const tokens = TOKEN_FILES.map((name) => {
  const path = `build/css/${name}`;
  if (!existsSync(path)) throw new Error(`${path} is missing. Run build:tokens first.`);
  return `/* ${name} */\n${readFileSync(path, 'utf8').trim()}\n`;
});
writeFileSync(`${DIST}/tokens.css`, tokens.join('\n'));

// Copied as is: its remote @imports are the point of the file.
writeFileSync(`${DIST}/fonts.css`, readFileSync('src/fonts.css', 'utf8'));

console.log('build:css → dist/styles.css, dist/tokens.css, dist/fonts.css');
