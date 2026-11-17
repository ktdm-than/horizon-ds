// npm run release:publish -- <version> [--dry-run]
//
// Publishes this package to npm. <version> must equal package.json "version": the version bump is
// its own reviewed change, and this script only publishes what was merged.
//
// Order: refuse early → every gate → registry check → lift "private" for `npm publish` only →
// restore it → tag → install the published version into an empty folder and render a component.
//
// "private": true is what stops a stray `npm publish`. It is lifted for exactly one command and
// restored three ways: inline right after that command, on process 'exit', and on SIGINT (plus
// SIGTERM/SIGHUP). Not in `finally`: `finally` does not run when something calls process.exit(),
// and that would leave the repo publishable with nothing reporting it. SIGKILL cannot be caught by
// any process; if that ever happens, `git diff package.json` shows the missing guard.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { constants, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const PKG_PATH = resolve('package.json');

// ---------------------------------------------------------------------------
// The guard. Registered before anything can lift it.
// ---------------------------------------------------------------------------

let originalPkgText = null; // non-null only while "private" is lifted

function restorePrivate(reason) {
  if (originalPkgText === null) return;
  const text = originalPkgText;
  try {
    writeFileSync(PKG_PATH, text);
  } catch (err) {
    console.error(`\n!!! Could not restore package.json (${reason}): ${err.message}`);
  }
  let restored = false;
  try {
    restored = JSON.parse(readFileSync(PKG_PATH, 'utf8')).private === true;
  } catch {}
  if (restored) {
    originalPkgText = null;
    console.log(`\n"private": true restored (${reason}).`);
  } else {
    console.error(
      `\n!!! "private": true is NOT back in package.json (${reason}). The repo is publishable.\n` +
        '!!! Restore it now: git checkout -- package.json',
    );
    process.exitCode = 1;
  }
}

process.on('exit', () => restorePrivate('exit'));
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    restorePrivate(signal);
    process.exit(128 + constants.signals[signal]);
  });
}

function liftPrivate() {
  const text = readFileSync(PKG_PATH, 'utf8');
  const pkg = JSON.parse(text);
  delete pkg.private;
  originalPkgText = text; // set before writing, so a failed write is still restored
  writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function refuse(message) {
  console.error(`\nrelease:publish refused: ${message}`);
  process.exit(1);
}

function step(title) {
  console.log(`\n── ${title}`);
}

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', ...options });
  if (result.signal) refuse(`\`${cmd} ${args.join(' ')}\` was stopped by ${result.signal}.`);
  return result.status === 0;
}

function capture(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { encoding: 'utf8', ...options });
  return { ok: result.status === 0, out: (result.stdout ?? '').trim(), err: (result.stderr ?? '').trim() };
}

function gate(title, cmd, args, options) {
  step(title);
  if (!run(cmd, args, options)) refuse(`gate failed: ${title}.`);
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

// Returns true, false, or refuses when the registry cannot answer.
function isOnRegistry(name, version) {
  const r = capture('npm', ['view', `${name}@${version}`, 'version', '--json']);
  if (r.ok) return r.out !== '' && r.out !== '[]';
  if (/E404/.test(r.err + r.out)) return false;
  refuse(`could not ask the registry about ${name}@${version}:\n${r.err || r.out}`);
}

// Installs `spec` into a new empty folder and renders components from it, through both the ESM and
// the CJS entry, and checks both stylesheets resolve through the exports map.
function smokeTest(spec, pkg) {
  const dir = mkdtempSync(join(tmpdir(), 'horizon-ds-smoke-'));
  try {
    writeFileSync(join(dir, 'package.json'), '{ "name": "smoke", "private": true, "type": "module" }\n');
    const react = pkg.devDependencies.react;
    const reactDom = pkg.devDependencies['react-dom'];
    if (!run('npm', ['install', '--no-audit', '--no-fund', spec, `react@${react}`, `react-dom@${reactDom}`], { cwd: dir })) {
      return false;
    }
    writeFileSync(
      join(dir, 'smoke.js'),
      `import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '${pkg.name}';

const require = createRequire(import.meta.url);
const cjs = require('${pkg.name}');
const css = (path) => readFileSync(fileURLToPath(import.meta.resolve(path)), 'utf8');

const button = renderToStaticMarkup(createElement(Button, null, 'Book now'));
const card = renderToStaticMarkup(createElement(cjs.Card));
const checks = [
  ['ESM: Button renders', button.includes('hds-button') && button.includes('Book now')],
  ['CJS: Card renders', card.includes('hds-card')],
  ['styles.css resolves', css('${pkg.name}/styles.css').includes('.hds-button')],
  ['tokens.css resolves', css('${pkg.name}/tokens.css').includes(':root')],
  ['fonts.css resolves', css('${pkg.name}/fonts.css').includes('fonts.googleapis.com')],
];
for (const [name, ok] of checks) console.log((ok ? '  ok   ' : '  FAIL ') + name);
console.log('\\n' + button);
process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
`,
    );
    return run('node', ['smoke.js'], { cwd: dir });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const unknown = args.filter((a) => a.startsWith('-') && a !== '--dry-run');
const positional = args.filter((a) => !a.startsWith('-'));
if (unknown.length) refuse(`unknown option(s): ${unknown.join(' ')}.`);
if (positional.length !== 1) refuse('usage: npm run release:publish -- <version> [--dry-run]');

const version = positional[0];
if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(version)) refuse(`"${version}" is not a semver version.`);

const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8'));
const tag = `v${version}`;
console.log(`release:publish ${pkg.name}@${version}${dryRun ? ' (dry run: nothing is published or tagged)' : ''}`);

step('Preconditions');
if (pkg.private !== true) refuse('package.json has no "private": true. The guard is missing; restore it first.');
if (pkg.version !== version) {
  refuse(`package.json version is ${pkg.version}, not ${version}. Bump it in a reviewed PR first.`);
}
const dirty = capture('git', ['status', '--porcelain']).out;
const branch = capture('git', ['rev-parse', '--abbrev-ref', 'HEAD']).out;
const problems = [];
if (dirty) problems.push('the working tree has uncommitted changes');
if (branch !== 'main') problems.push(`HEAD is on "${branch}", not main`);
if (capture('git', ['rev-parse', '-q', '--verify', `refs/tags/${tag}`]).ok) problems.push(`tag ${tag} already exists`);
if (problems.length && !dryRun) refuse(`${problems.join('; ')}.`);
for (const p of problems) console.warn(`  warning (allowed in a dry run): ${p}`);
if (!dryRun) {
  const who = capture('npm', ['whoami']);
  if (!who.ok) refuse('not logged in to npm (`npm whoami` failed).');
  console.log(`  npm user: ${who.out}`);
}

step(`Registry: is ${pkg.name}@${version} already published?`);
if (isOnRegistry(pkg.name, version)) refuse(`${pkg.name}@${version} is already on the registry.`);
console.log('  no, it is not');

gate('Gate: type check (npm run lint)', 'npm', ['run', 'lint']);
gate('Gate: tests (npm test)', 'npm', ['test']);
gate('Gate: Storybook build (npm run build-storybook)', 'npm', ['run', 'build-storybook']);
gate('Gate: package build (npm run build:package)', 'npm', ['run', 'build:package']);

step('Gate: pack, install the tarball into an empty folder, render');
const packDir = mkdtempSync(join(tmpdir(), 'horizon-ds-pack-'));
const packed = capture('npm', ['pack', '--json', '--pack-destination', packDir]);
if (!packed.ok) refuse(`npm pack failed:\n${packed.err}`);
const tarball = join(packDir, JSON.parse(packed.out)[0].filename);
if (!existsSync(tarball)) refuse(`npm pack wrote no tarball at ${tarball}.`);
const packOk = smokeTest(tarball, pkg);
rmSync(packDir, { recursive: true, force: true });
if (!packOk) refuse('the packed tarball failed the render test.');

// Re-check: the gates took a while.
if (!dryRun && isOnRegistry(pkg.name, version)) refuse(`${pkg.name}@${version} appeared on the registry during the gates.`);

step(`npm publish${dryRun ? ' --dry-run' : ''} ("private" lifted for this command only)`);
liftPrivate();
const published = run('npm', ['publish', ...(dryRun ? ['--dry-run'] : [])]);
restorePrivate('inline, after npm publish');
if (originalPkgText !== null) refuse('"private": true could not be restored.');
if (!published) refuse('npm publish failed.');

if (dryRun) {
  step('Dry run complete');
  console.log(`  would tag ${tag}, push it, then install ${pkg.name}@${version} from the registry and render it.`);
  process.exit(0);
}

step(`Tag ${tag}`);
if (!run('git', ['tag', '-a', tag, '-m', `release: ${pkg.name}@${version}`])) {
  refuse(`published, but \`git tag ${tag}\` failed. Tag the release commit by hand.`);
}
if (!run('git', ['push', 'origin', tag])) refuse(`published and tagged, but pushing ${tag} failed. Push it by hand.`);

step(`Install ${pkg.name}@${version} from the registry into an empty folder and render`);
let visible = false;
for (let attempt = 1; attempt <= 10 && !visible; attempt++) {
  visible = isOnRegistry(pkg.name, version);
  if (!visible) {
    console.log(`  not visible on the registry yet (attempt ${attempt}/10), waiting 6s`);
    sleep(6000);
  }
}
if (!visible) refuse(`published, but ${pkg.name}@${version} never became visible. Check it by hand.`);
if (!smokeTest(`${pkg.name}@${version}`, pkg)) {
  refuse(`${pkg.name}@${version} is published but failed the render test. Deprecate it and fix forward.`);
}

console.log(`\nPublished ${pkg.name}@${version}, tagged ${tag}, and rendered it from the registry.`);
