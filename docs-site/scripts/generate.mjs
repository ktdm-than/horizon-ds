#!/usr/bin/env node
// Generates every generated page of the Horizon docs site from exactly these sources:
//   1. the repo at a pinned commit, read with `git show <sha>:<path>`
//   2. data/board.json   — the registry's statuses (no record, base or table IDs)
//   3. data/figma.json   — the live Figma reads
//   4. data/storybook-index.json — the deployed Storybook's index.json
// plus the token CSS that `npm run build:tokens` builds from the pinned commit's tokens/
// (build/css is generated and not in git, so it is passed in with --tokens <dir>).
//
// It writes, and only it writes: Home, All components, every component page, Tokens, Changelog,
// Roadmap, News, the copied token CSS, and the per-component sidebar list. Never edit its output
// by hand: fix this script or its sources.
//
// Usage: node scripts/generate.mjs --commit <sha> --tokens <path to build/css built at that sha>

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(SITE, 'src/content/docs');
const GEN = join(SITE, 'src/generated');

// ── args ────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
if (!args.commit) die('Missing --commit <sha>.');
if (!args.tokens) die('Missing --tokens <dir>: the build/css folder built from the pinned commit.');

// Every git call runs at the repo's top level, so paths are repo paths, not docs-site/ paths.
const TOP = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: SITE, encoding: 'utf8' }).trim();
const git = (...a) => execFileSync('git', a, { cwd: TOP, encoding: 'utf8', maxBuffer: 64 << 20 }).trim();
const SHA = git('rev-parse', '--verify', `${args.commit}^{commit}`);
const SHORT = SHA.slice(0, 7);
const COMMIT_DATE = git('show', '-s', '--format=%cs', SHA);
const show = (p) => {
  try {
    return execFileSync('git', ['show', `${SHA}:${p}`], { cwd: TOP, encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
};
const lsTree = (p) => git('ls-tree', '-r', '--name-only', SHA, p).split('\n').filter(Boolean);
const REPO = git('remote', 'get-url', 'origin').replace(/\.git$/, '').replace(/^git@github\.com:/, 'https://github.com/');
const blob = (p, line) => `${REPO}/blob/${SHA}/${p}${line ? `#L${line}` : ''}`;
const tree = (p) => `${REPO}/tree/${SHA}/${p}`;

function die(msg) {
  console.error(`generate.mjs: ${msg}`);
  process.exit(1);
}

// ── sources ─────────────────────────────────────────────────────────────────
const board = JSON.parse(readFileSync(join(SITE, 'data/board.json'), 'utf8'));
const figma = JSON.parse(readFileSync(join(SITE, 'data/figma.json'), 'utf8'));
const sbIndexPath = join(SITE, 'data/storybook-index.json');
const sbIndex = existsSync(sbIndexPath) ? JSON.parse(readFileSync(sbIndexPath, 'utf8')) : null;
const stories = sbIndex ? Object.values(sbIndex.entries).filter((e) => e.type === 'story') : [];

const pkg = JSON.parse(show('package.json'));
const readme = show('README.md') ?? '';
const versioning = show('VERSIONING.md');
const intentGaps = show('docs/intent-gaps.md');
const indexTs = show('src/index.ts') ?? '';

const parseVars = (css) => Object.fromEntries([...css.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const tokenFile = (f) => {
  const p = join(resolve(args.tokens), f);
  if (!existsSync(p)) die(`Token file ${p} is missing. Run npm run build:tokens at ${SHORT}.`);
  return readFileSync(p, 'utf8');
};
const TOKENS = {
  root: parseVars(tokenFile('tokens.css')),
  dark: parseVars(tokenFile('tokens-dark.css')),
  english: parseVars(tokenFile('tokens-english.css')),
  burmese: parseVars(tokenFile('tokens-burmese.css')),
};

// Published versions: v* tags, newest first. A tag counts only if it exists in this repo.
const TAGS = git('tag', '--list', 'v*', '--sort=-v:refname')
  .split('\n')
  .filter(Boolean)
  // The tag's own date (tagger date for an annotated tag), i.e. when the release was tagged.
  .map((t) => ({ tag: t, version: t.slice(1), date: git('for-each-ref', `refs/tags/${t}`, '--format=%(creatordate:short)') }));
const LATEST = TAGS[0] ?? null;
const shippedIn = (commit) => {
  // The earliest tag that contains the commit.
  const containing = git('tag', '--list', 'v*', '--contains', commit, '--sort=v:refname').split('\n').filter(Boolean);
  return containing[0] ? containing[0].slice(1) : null;
};

// ── text helpers ────────────────────────────────────────────────────────────
// Escape plain text for MDX/Markdown (text from Figma, intent files, git subjects).
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');
const cell = (s) => esc(s).replace(/\|/g, '\\|').replace(/\n+/g, ' ');
const code = (s) => '`' + String(s).replace(/`/g, '') + '`';
const codeCell = (s) => code(String(s).replace(/\|/g, '\\|'));
// Make existing Markdown (from repo files) safe for MDX: escape braces and angle brackets outside code.
const mdxSafe = (md) =>
  md
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((part, i) => (i % 2 ? part : part.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/<(?![a-z]+:\/\/)/g, '&lt;')))
    .join('');
const notice = (title, body) => `<Aside type="caution" title=${JSON.stringify(title)}>\n${body}\n</Aside>\n`;
const footer = () =>
  `\n---\n\n<small>Generated by \`docs-site/scripts/generate.mjs\` from [\`${SHORT}\`](${REPO}/commit/${SHA}) (${COMMIT_DATE}), \`data/board.json\` and \`data/figma.json\` read ${board.readAt}. Do not edit this page by hand.</small>\n`;
const slug = (name) => name.toLowerCase();
const write = (rel, content) => {
  const p = join(DOCS, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  written.push(rel);
};
const written = [];
const fm = (o) =>
  '---\n' +
  Object.entries(o)
    .map(([k, v]) => (typeof v === 'object' ? `${k}:\n${Object.entries(v).map(([a, b]) => `  ${a}: ${JSON.stringify(b)}`).join('\n')}` : `${k}: ${JSON.stringify(v)}`))
    .join('\n') +
  '\n---\n\n';

// ── README pieces ───────────────────────────────────────────────────────────
const readmeLines = readme.split('\n');
const readmeFirstPara = (() => {
  const start = readmeLines.findIndex((l, i) => i > 0 && l.trim() && !l.startsWith('#'));
  const out = [];
  for (let i = start; i >= 0 && i < readmeLines.length && readmeLines[i].trim(); i++) out.push(readmeLines[i]);
  return out.join(' ');
})();
const readmeSection = (heading) => {
  const i = readmeLines.findIndex((l) => l.replace(/^#+\s*/, '') === heading && l.startsWith('#'));
  if (i < 0) return null;
  const level = readmeLines[i].match(/^#+/)[0].length;
  const out = [];
  for (let j = i + 1; j < readmeLines.length; j++) {
    const m = readmeLines[j].match(/^(#+)\s/);
    if (m && m[1].length <= level) break;
    out.push(readmeLines[j]);
  }
  return out.join('\n').trim();
};
const firstFence = (md, lang) => {
  const m = md && md.match(new RegExp('```' + (lang ?? '\\w*') + '\\n([\\s\\S]*?)```'));
  return m ? m[1].trimEnd() : null;
};
const INSTALL = firstFence(readmeSection('Install'), 'bash');
const USE_EXAMPLE = firstFence(readmeSection('Use'), 'tsx');

// ── TypeScript reading (types at the pinned commit) ─────────────────────────
function readProps(src, typeName, fnName) {
  if (!src) return null;
  const start = src.indexOf(`export type ${typeName} =`);
  if (start < 0) return null;
  const open = src.indexOf('{', start);
  let depth = 0;
  let end = open;
  for (; end < src.length; end++) {
    if (src[end] === '{') depth++;
    if (src[end] === '}' && --depth === 0) break;
  }
  const head = src.slice(start, open).replace(/\s+/g, ' ');
  const extendsNative = /ButtonHTMLAttributes/.test(head) ? '`<button>` attribute (`onClick`, `type`, `disabled`, `aria-*`, …)' : null;
  const body = src.slice(open + 1, end);
  const props = [];
  const re = /(\/\*\*([\s\S]*?)\*\/\s*)?('?[\w-]+'?)(\?)?:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(body))) {
    const doc = m[2] ? m[2].replace(/^\s*\*\s?/gm, '').replace(/\s+/g, ' ').trim() : '';
    props.push({ name: m[3].replace(/'/g, ''), optional: !!m[4], type: m[5].replace(/\s+/g, ' ').trim(), doc });
  }
  // Defaults from the function's destructuring.
  const fnStart = src.indexOf(`export function ${fnName}(`);
  if (fnStart >= 0) {
    const sig = src.slice(fnStart, src.indexOf('}:', fnStart));
    for (const p of props) {
      const d = sig.match(new RegExp(`'?${p.name.replace(/[-]/g, '\\-')}'?(?::\\s*\\w+)?\\s*=\\s*('[^']*'|"[^"]*"|[\\w.]+)`));
      if (d) p.default = d[1];
    }
  }
  return { props, extendsNative, head: head.trim() };
}
function readUnionTypes(src) {
  if (!src) return [];
  return [...src.matchAll(/export type (\w+) = ((?:'[^']*'\s*\|\s*)+'[^']*');/g)].map((m) => ({ name: m[1], type: m[2] }));
}
function lineOf(src, needle) {
  const i = src.split('\n').findIndex((l) => l.includes(needle));
  return i >= 0 ? i + 1 : null;
}

// ── components ──────────────────────────────────────────────────────────────
const eligible = board.components.filter(
  (c) => ['Completed', 'Released'].includes(c.development) && c.releaseVerdict === 'Cleared',
);
const notEligible = board.components.filter((c) => !eligible.includes(c));
const sbRoot = (c) => {
  try {
    return new URL(c.productionStorybook).origin;
  } catch {
    return null;
  }
};
const figmaNode = (c) => {
  try {
    return new URL(c.figma).searchParams.get('node-id')?.replace('-', ':');
  } catch {
    return null;
  }
};

// Every component file in the component's folder at the pinned commit (subcomponents included).
function componentFiles(name) {
  const dir = `src/components/${name}`;
  const files = lsTree(dir);
  const parts = files
    .filter((f) => /\/(\w+)\.tsx$/.test(f) && !/\.(stories|test)\.tsx$/.test(f))
    .map((f) => f.match(/\/(\w+)\.tsx$/)[1]);
  // The component itself first, then its parts in source order of composition.
  parts.sort((a, b) => (a === name ? -1 : b === name ? 1 : a.localeCompare(b)));
  return { dir, files, parts };
}

function storyEmbed(root, id, theme) {
  return `${root}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`;
}
const iframe = (src, title, height = 260) =>
  `<iframe src="${src}" title=${JSON.stringify(title)} loading="lazy" style="width:100%;height:${height}px;border:1px solid var(--sl-color-hairline);border-radius:var(--borderradius-sm)"></iframe>`;

function tokenRow(t) {
  const light = TOKENS.root[t] ?? TOKENS.english[t];
  const dark = TOKENS.dark[t];
  const burmese = TOKENS.burmese[t];
  return { t, light, dark, burmese, exists: light !== undefined || dark !== undefined || burmese !== undefined };
}

function gapRows(names) {
  if (!intentGaps) return [];
  return intentGaps
    .split('\n')
    .filter((l) => l.startsWith('| ') && !l.startsWith('| Component') && !l.startsWith('|---'))
    .map((l) => l.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim()))
    .filter((cols) => names.includes(cols[0]));
}
function buildReportGaps(name) {
  const path = `docs/${slug(name)}-build-report.md`;
  const md = show(path);
  if (!md) return { path, table: null };
  const lines = md.split('\n');
  const i = lines.findIndex((l) => /^## Design gaps/.test(l));
  if (i < 0) return { path, table: null };
  const out = [];
  for (let j = i + 1; j < lines.length && !/^## /.test(lines[j]); j++) out.push(lines[j]);
  return { path, table: out.join('\n').trim() };
}

function versionPromise() {
  if (!versioning) return notice('No versioning source', '`VERSIONING.md` does not exist at this commit, so this version promises nothing in writing.');
  const sec = (h) => {
    const ls = versioning.split('\n');
    const i = ls.findIndex((l) => l.trim() === h);
    if (i < 0) return null;
    const out = [];
    for (let j = i + 1; j < ls.length && !/^##? /.test(ls[j]) && !(ls[j].startsWith('### ') && j > i); j++) out.push(ls[j]);
    return out.join('\n').trim();
  };
  const before = sec('### Before 1.0.0 (now)');
  return (
    `The package is \`${pkg.version}\` in \`package.json\` at \`${SHORT}\`. From [\`VERSIONING.md\`](${blob('VERSIONING.md')}):\n\n` +
    (before ? mdxSafe(before) + '\n' : '') +
    `\nThis component's props, its exported types, the semantic tokens it uses and the stylesheet entry points are the public API that promise covers. Class names inside the markup (\`hds-*\`) are not.\n`
  );
}

function componentPage(c) {
  const name = c.name;
  const { dir, parts } = componentFiles(name);
  const fig = figma.components[name] ?? null;
  const root = sbRoot(c);
  const compStories = stories.filter((s) => s.importPath?.startsWith(`./${dir}/`));
  const matrixNames = new Set((fig?.sets ?? []).flatMap((s) => s.variants.map((v) => `${s.name === 'Btn' ? name : s.name} / ${v.name}`)));
  const isMatrix = (s) => matrixNames.has(s.name);
  const lastCommit = git('log', '-1', '--format=%H', SHA, '--', dir);
  const since = lastCommit ? shippedIn(lastCommit) : null;
  const intents = Object.fromEntries(
    parts.map((p) => {
      const raw = show(`${dir}/${p}.intent.json`);
      return [p, raw ? JSON.parse(raw) : null];
    }),
  );
  const intent = intents[name];
  const srcs = Object.fromEntries(parts.map((p) => [p, show(`${dir}/${p}.tsx`)]));
  const missingUsage = (what) =>
    notice(
      `${what}: not in Figma`,
      `The Figma documentation page has no usage region that says this${fig?.usage?.frame ? ` (usage frame ${fig.usage.frame} is silent on it)` : ''}. Recorded in [\`docs/intent-gaps.md\`](${blob('docs/intent-gaps.md')}) for a designer to close in Figma.`,
    );

  let o = fm({
    title: name,
    description: `${name}: usage, examples, code, design and changelog, from horizon-ds at ${SHORT}.`,
    tableOfContents: false,
  });
  o += `import { Tabs, TabItem, Aside, Badge } from '@astrojs/starlight/components';\n\n`;

  // Header strip
  const status = (c.development ?? 'unknown').toLowerCase();
  o += `<div class="hds-strip">\n\n`;
  o += `<Badge text=${JSON.stringify(status)} variant=${JSON.stringify(status === 'released' ? 'success' : 'note')} /> <Badge text=${JSON.stringify(since ? `since ${since}` : 'not yet published')} variant="default" /> <Badge text=${JSON.stringify(`release review: ${(c.releaseVerdict ?? 'none').toLowerCase()}`)} variant=${JSON.stringify(c.releaseVerdict === 'Cleared' ? 'success' : 'caution')} />\n\n`;
  const links = [];
  if (c.productionStorybook) links.push(`[Storybook](${c.productionStorybook})`);
  if (c.figma) links.push(`[Figma node ${figmaNode(c) ?? ''}](${c.figma})`);
  links.push(`[Source](${tree(dir)})`);
  if (c.releaseReview) links.push(`[Release review](${c.releaseReview})`);
  o += links.join(' · ') + '\n\n</div>\n\n';

  o += `<Tabs>\n`;

  // ── Usage ──
  o += `<TabItem label="Usage">\n\n`;
  o += `## When to use it\n\n`;
  o += intent?.use_when?.length ? intent.use_when.map((u) => `- ${esc(u)}`).join('\n') + '\n\n' : missingUsage('When to use');
  o += `### Where it goes\n\n`;
  o += intent?.placement?.length
    ? intent.placement.map((p) => `- ${esc(p.where)} (story \`${p.story}\`)`).join('\n') + '\n\n'
    : notice('Where it goes: no story places it', `No story at \`${SHORT}\` renders ${name} inside another component, so the intent file's \`placement\` is empty.`);
  o += `### When not to use it\n\n`;
  o += intent?.dont_use_when?.length
    ? intent.dont_use_when.map((d) => `- ${esc(d.when)}${d.use_instead ? ` **Use instead:** ${esc(d.use_instead)}.` : ''}`).join('\n') + '\n\n'
    : missingUsage('When not to use');
  o += `## Best practice\n\n`;
  o += fig?.usage?.bestPractice?.length
    ? fig.usage.bestPractice.map((b) => `- ${esc(b)}`).join('\n') + `\n\n<small>From the Figma usage frame ${fig.usage.frame}, read ${figma.readAt}.</small>\n\n`
    : missingUsage('Best practice');
  o += `## What each variant is for\n\n`;
  for (const p of parts) {
    const vi = intents[p]?.variant_intent ?? {};
    const rows = Object.entries(vi).flatMap(([prop, vals]) => Object.entries(vals).map(([v, x]) => [prop, v, x.purpose]));
    if (!rows.length) continue;
    if (parts.length > 1) o += `### ${p}\n\n`;
    o += `| Prop | Value | What it is for |\n|---|---|---|\n`;
    o += rows.map(([prop, v, purpose]) => `| ${codeCell(prop)} | ${codeCell(v)} | ${purpose ? cell(purpose) : '*Not stated in Figma*'} |`).join('\n') + '\n\n';
    if (rows.some((r) => !r[2])) o += `<small>An empty purpose means the Figma usage region does not say what that value is for; see [\`docs/intent-gaps.md\`](${blob('docs/intent-gaps.md')}).</small>\n\n`;
  }
  o += `## Accessibility\n\n`;
  for (const p of parts) {
    const facts = intents[p]?.a11y ?? [];
    if (parts.length > 1) o += `### ${p}\n\n`;
    if (!facts.length) {
      o += notice('No accessibility facts', `\`${p}.intent.json\` lists none.`);
      continue;
    }
    o += facts
      .map((f) => {
        const [path, line] = f.source.split(':');
        return `- ${esc(f.fact)} ([\`${f.source}\`](${blob(path, line)}))`;
      })
      .join('\n') + '\n\n';
  }
  o += `## Composition\n\n`;
  o += c.composes?.length
    ? `On the board, ${name} composes: ${c.composes.map(esc).join(', ')}.\n\n`
    : notice('Composes is empty on the board', `The registry's \`Composes\` column for ${name} is empty.`);
  if (parts.length > 1 || /from '\.\.\//.test(srcs[name] ?? '')) {
    const imports = [...(srcs[name] ?? '').matchAll(/import \{ (\w+)[^}]*\} from '([^']+)'/g)].map((m) => m[1]);
    const subImports = parts
      .filter((p) => p !== name)
      .flatMap((p) => [...(srcs[p] ?? '').matchAll(/import \{ (\w+)[^}]*\} from '\.\.\/(\w+)\//g)].map((m) => `${p} → ${m[1]}`));
    o += `In the code at \`${SHORT}\`, \`${name}.tsx\` imports ${imports.map(code).join(', ') || 'nothing'}.${subImports.length ? ` Across folders: ${subImports.map(code).join(', ')}.` : ''} Its parts are exported from \`src/index.ts\` and documented on this page.\n\n`;
    const pw = intent?.pairs_with ?? [];
    if (pw.length) o += `Pairs with (from \`${name}.intent.json\`): ${pw.map((x) => `${x.component} (story \`${x.story}\`)`).join(', ')}.\n\n`;
  }
  if (parts.length > 1) {
    o += `### The parts\n\n`;
    for (const p of parts.filter((x) => x !== name)) {
      const it = intents[p];
      const desc = fig?.sets?.find((s) => s.name === p)?.description;
      o += `#### ${p}\n\n`;
      if (desc) o += `${esc(desc)} <small>(Figma component description)</small>\n\n`;
      o += it?.use_when?.length ? it.use_when.map((u) => `- ${esc(u)}`).join('\n') + '\n\n' : notice(`${p}: no usage in Figma`, `${p}'s block on the Figma page carries no usage text, so its \`use_when\`, \`dont_use_when\` and \`best_practice\` are empty.`);
    }
  }
  o += `## What this version promises\n\n` + versionPromise() + '\n';
  o += `</TabItem>\n`;

  // ── Examples ──
  o += `<TabItem label="Examples">\n\n`;
  o += `## The common case\n\nFrom the README at \`${SHORT}\`:\n\n`;
  o += USE_EXAMPLE ? '```tsx\n' + USE_EXAMPLE + '\n```\n\n' : notice('No README example', 'The README has no `Use` example at this commit.');
  o += `## Stories\n\n`;
  if (!sbIndex) {
    o += notice('Storybook did not answer', "The production Storybook's `index.json` could not be read for this build, so no story is embedded.");
  } else {
    const ex = compStories.filter((s) => !isMatrix(s));
    if (!ex.length) o += notice('No stories beyond the variant matrix', 'Every story is a matrix row; see the Design tab.');
    o += `Every story that is not a variant-matrix row, rendered live from [Storybook](${root}) in light and dark. If a frame stays blank, see [Embedding](/help/embedding/).\n\n`;
    for (const s of ex) {
      o += `### ${esc(s.name)}\n\n`;
      o += `<div class="hds-pair">\n${iframe(storyEmbed(root, s.id, 'light'), `${s.name} (light)`)}\n${iframe(storyEmbed(root, s.id, 'dark'), `${s.name} (dark)`)}\n</div>\n\n`;
      o += `<small>[Open in Storybook](${root}/?path=/story/${s.id})</small>\n\n`;
    }
  }
  o += `</TabItem>\n`;

  // ── Code ──
  o += `<TabItem label="Code">\n\n`;
  o += `## Import\n\n`;
  const exported = parts.filter((p) => new RegExp(`export \\{ ${p}\\b`).test(indexTs));
  o += exported.length
    ? '```tsx\n' + `import { ${exported.join(', ')} } from '${pkg.name}';\n` + '```\n\n'
    : notice('Not exported', `\`src/index.ts\` does not export ${name} at this commit.`);
  o += `Load the styles once, at your app root (README):\n\n\`\`\`ts\nimport '${pkg.name}/tokens.css';\nimport '${pkg.name}/fonts.css';\nimport '${pkg.name}/styles.css';\n\`\`\`\n\n`;
  o += `## Props\n\n`;
  for (const p of parts) {
    const pr = readProps(srcs[p], `${p}Props`, p);
    o += `### ${p}\n\n`;
    if (!pr) {
      o += notice('No props type', `\`${p}Props\` was not found in \`${dir}/${p}.tsx\`.`);
      continue;
    }
    o += `| Prop | Type | Default | Description |\n|---|---|---|---|\n`;
    o += pr.props.map((x) => `| ${codeCell(x.name)} | ${codeCell(x.type)} | ${x.default ? codeCell(x.default) : '—'} | ${cell(x.doc) || '—'} |`).join('\n') + '\n\n';
    if (pr.extendsNative) o += `Also takes every native ${pr.extendsNative}. Source: [\`${dir}/${p}.tsx\`](${blob(`${dir}/${p}.tsx`, lineOf(srcs[p], `export type ${p}Props`))}).\n\n`;
    else o += `Source: [\`${dir}/${p}.tsx\`](${blob(`${dir}/${p}.tsx`, lineOf(srcs[p], `export type ${p}Props`))}).\n\n`;
  }
  const unions = parts.flatMap((p) => readUnionTypes(srcs[p]));
  if (unions.length) {
    o += `## Types\n\n| Type | Values |\n|---|---|\n` + unions.map((u) => `| ${codeCell(u.name)} | ${codeCell(u.type)} |`).join('\n') + '\n\n';
  }
  o += `## Tokens it needs\n\n`;
  const toks = [...new Set(parts.flatMap((p) => intents[p]?.required_tokens ?? []))];
  if (!toks.length) o += notice('No token list', 'The intent files list no required tokens.');
  else {
    const rows = toks.map(tokenRow);
    o += `From the intent files' \`required_tokens\`, with values from \`build/css/\` built at \`${SHORT}\`. Dark is the \`[data-theme="dark"]\` value; English and Burmese are the typography modes.\n\n`;
    o += `| Token | Light | Dark | Burmese |\n|---|---|---|---|\n`;
    o += rows
      .map((r) =>
        r.exists
          ? `| ${codeCell('--' + r.t)} | ${r.light ? codeCell(r.light) : '—'} | ${r.dark ? codeCell(r.dark) : '*same as light*'} | ${r.burmese ? codeCell(r.burmese) : '*same as light*'} |`
          : `| ${codeCell('--' + r.t)} | **missing from the build** | | |`,
      )
      .join('\n') + '\n\n';
    const same = rows.filter((r) => r.dark !== undefined && r.dark === r.light).length;
    if (same) o += notice('Dark values equal light', `${same} of the colour tokens above have the same value in dark as in light at \`${SHORT}\`. That is what the token build ships; it is a design gap to close in Figma, not here.`);
  }
  o += `## The full API, in Storybook\n\n`;
  const first = compStories[0];
  o += first && root ? `${iframe(`${root}/?path=/story/${first.id}`, `${name} in Storybook`, 520)}\n\n<small>Storybook's own controls and props panel. If it stays blank, see [Embedding](/help/embedding/).</small>\n\n` : notice('No Storybook', 'No story to embed.');
  o += `</TabItem>\n`;

  // ── Design ──
  o += `<TabItem label="Design">\n\n`;
  o += `## The Figma node\n\n`;
  if (c.figma) {
    o += `${iframe(`https://www.figma.com/embed?embed_host=horizon-docs&url=${encodeURIComponent(c.figma)}`, `${name} in Figma`, 480)}\n\n`;
    o += `<small>The Figma file is shared with the team only; outside viewers see a sign-in prompt. [Open node ${figmaNode(c)}](${c.figma}).</small>\n\n`;
  }
  if (fig?.screenshot) o += `![${esc(name)} in Figma, read ${figma.readAt}](${fig.screenshot})\n\n`;
  o += `## The variant matrix\n\n`;
  if (!fig?.sets?.length) o += notice('No Figma read', `\`data/figma.json\` has no variant matrix for ${name}.`);
  for (const s of fig?.sets ?? []) {
    const label = s.name === 'Btn' ? name : s.name;
    o += `### ${esc(label)} <small>(Figma ${s.node})</small>\n\n| Figma variant | Node | Story |\n|---|---|---|\n`;
    o += s.variants
      .map((v) => {
        const st = compStories.find((x) => x.name === `${label} / ${v.name}`) ?? stories.find((x) => x.name === `${label} / ${v.name}`);
        return `| ${cell(v.name)} | ${v.node} | ${st && root ? `[\`${st.id}\`](${root}/?path=/story/${st.id})` : '*no matrix story*'} |`;
      })
      .join('\n') + '\n\n';
  }
  o += `## Both themes\n\n`;
  const pick = compStories.find(isMatrix) ?? compStories[0];
  o += pick && root ? `<div class="hds-pair">\n${iframe(storyEmbed(root, pick.id, 'light'), `${pick.name} (light)`)}\n${iframe(storyEmbed(root, pick.id, 'dark'), `${pick.name} (dark)`)}\n</div>\n\n<small>\`${pick.id}\`, light then dark.</small>\n\n` : notice('No story', 'Nothing to render in both themes.');
  o += `## What Figma never bound\n\n`;
  o += fig?.unbound?.length
    ? `| Node | What | Value | Note |\n|---|---|---|---|\n` + fig.unbound.map((u) => `| ${cell(u.node)} | ${cell(u.what)} | ${codeCell(u.value)} | ${cell(u.note)} |`).join('\n') + `\n\n<small>Read live from Figma ${figma.readAt}.</small>\n\n`
    : notice('No unbound values recorded', `\`data/figma.json\` lists no unbound values for ${name}.`);
  o += `## Recorded design gaps\n\n`;
  const ig = gapRows(parts);
  o += ig.length
    ? `From [\`docs/intent-gaps.md\`](${blob('docs/intent-gaps.md')}):\n\n| Component | Empty field(s) | Missing source |\n|---|---|---|\n` + ig.map((r) => `| ${r.map((x) => mdxSafe(x)).join(' | ')} |`).join('\n') + '\n\n'
    : `No row for ${name} in \`docs/intent-gaps.md\`.\n\n`;
  const br = buildReportGaps(name);
  o += br.table ? `From the build report [\`${br.path}\`](${blob(br.path)}):\n\n${mdxSafe(br.table)}\n\n` : notice('No build report gaps', `\`${br.path}\` has no "Design gaps" section at this commit.`);
  o += `</TabItem>\n`;

  // ── Changelog ──
  o += `<TabItem label="Changelog">\n\n`;
  const log = git('log', '--format=%H%x09%cs%x09%s', SHA, '--', dir)
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split('\t'));
  o += `Every commit that touched \`${dir}/\` (the component and its parts) up to \`${SHORT}\`, newest first. Released in = the first \`v*\` tag that contains the commit.\n\n`;
  o += `| Date | Commit | Subject | Released in |\n|---|---|---|---|\n`;
  o += log.map(([h, d, s]) => `| ${d} | [\`${h.slice(0, 7)}\`](${REPO}/commit/${h}) | ${cell(s)} | ${shippedIn(h) ?? '*unreleased*'} |`).join('\n') + '\n\n';
  o += `</TabItem>\n</Tabs>\n`;
  o += footer();
  return o;
}

// ── pages ───────────────────────────────────────────────────────────────────
rmSync(join(DOCS, 'core/components'), { recursive: true, force: true });

const latestStorybook = (() => {
  const roots = eligible.map(sbRoot).filter(Boolean);
  return roots[0] ?? null;
})();

// Home
{
  let o = fm({
    title: 'Horizon DS',
    description: readmeFirstPara,
    template: 'splash',
    hero: { tagline: readmeFirstPara },
  });
  // hero actions need nested arrays; write them by hand
  o = o.replace(
    '\n---\n\n',
    `\n  actions:\n    - text: Start designing\n      link: /designing/introduction/\n      icon: right-arrow\n    - text: Start coding\n      link: /developing/introduction/\n      icon: right-arrow\n      variant: minimal\n${latestStorybook ? `    - text: Open Storybook\n      link: ${latestStorybook}\n      icon: external\n      variant: minimal\n` : ''}---\n\n`,
  );
  o += `import { CardGrid, LinkCard, Aside } from '@astrojs/starlight/components';\n\n`;
  if (LATEST) {
    o += `## Latest release — ${LATEST.version}\n\nPublished ${LATEST.date} as \`${pkg.name}@${LATEST.version}\`, with ${eligible.length} documented component${eligible.length === 1 ? '' : 's'}.\n\n`;
  } else {
    o += `## Latest release\n\n`;
    o += notice('Not published yet', `No \`v*\` tag exists in the repo, so no version has been published. \`package.json\` at \`${SHORT}\` reads \`${pkg.version}\`.`);
  }
  if (INSTALL) o += '\n```bash\n' + INSTALL + '\n```\n\n';
  o += `[Read the changelog](/get-started/changelog/)\n\n`;
  o += `## Where to go\n\n<CardGrid>\n`;
  o += `  <LinkCard title="Designing" href="/designing/introduction/" description="How the system is built from the Figma library." />\n`;
  o += `  <LinkCard title="Developing" href="/developing/introduction/" description="Install the package, load the styles, use the components." />\n`;
  o += `  <LinkCard title="Components" href="/core/components/overview/" description="${eligible.length} component${eligible.length === 1 ? '' : 's'} with usage, examples, code and design." />\n`;
  o += `  <LinkCard title="Tokens" href="/core/tokens/" description="Every semantic token, in light, dark, English and Burmese." />\n`;
  o += `</CardGrid>\n`;
  o += footer();
  writeFileSync(join(DOCS, 'index.mdx'), o);
  written.push('index.mdx');
}

// All components
{
  let o = fm({ title: 'All components', description: `Every component documented at ${SHORT}.` });
  o += `import { Aside } from '@astrojs/starlight/components';\n\n`;
  o += `The package exports these components. Each one is on the board, reads \`Completed\` or \`Released\`, and has a \`Cleared\` release review.\n\n`;
  o += `| Component | Status | Since | What it is for |\n|---|---|---|---|\n`;
  for (const c of eligible) {
    const lc = git('log', '-1', '--format=%H', SHA, '--', `src/components/${c.name}`);
    const since = lc ? shippedIn(lc) : null;
    const desc = figma.components[c.name]?.description;
    o += `| [${c.name}](/core/components/${slug(c.name)}/) | ${esc(c.development.toLowerCase())} | ${since ?? '*not yet published*'} | ${desc ? cell(desc) + ' *(Figma description)*' : '*Figma has no component description*'} |\n`;
  }
  o += `\n## What is not here\n\n`;
  o += `- Components that are not \`Completed\` or \`Released\` with a \`Cleared\` verdict are on the [Roadmap](/get-started/roadmap/) instead.${notEligible.length ? ` Now: ${notEligible.map((c) => esc(c.name)).join(', ')}.` : ' None right now.'}\n`;
  const allDirs = [...new Set(lsTree('src/components').map((f) => f.split('/')[2]))];
  const onBoard = new Set(board.components.map((c) => c.name));
  const offBoard = allDirs.filter((d) => !onBoard.has(d));
  if (offBoard.length) o += `- In the code but not on the board: ${offBoard.map(code).join(', ')}. With no registry row there is no status, so no page. Where a documented component uses it, its page covers it.\n`;
  o += `- Parts of a component (for example Card's \`CardContainer\`, \`CardLayout\`, \`CardImage\`, \`CardText\`) are exported, but documented on their parent's page.\n`;
  o += footer();
  write('core/components/overview.mdx', o);
}

// Component pages
for (const c of eligible) write(`core/components/${slug(c.name)}.mdx`, componentPage(c));

// Tokens
{
  let o = fm({ title: 'Tokens', description: `Every semantic token at ${SHORT}, in light, dark, English and Burmese.` });
  o += `import { Aside } from '@astrojs/starlight/components';\n\n`;
  o += `Values come from \`build/css/\`, built by \`npm run build:tokens\` from \`tokens/\` at \`${SHORT}\`. Components use semantic tokens only; primitives (\`--color-blue-500\` and the like) are not public API (\`VERSIONING.md\`).\n\n`;
  o += `Modes: dark is \`[data-theme="dark"]\` on an ancestor; Burmese type is \`lang="my"\` (README).\n\n`;
  const primitive = /^color-(blue|aqua|mint|green|yellow|orange|red|pink|purple|grey|gray|neutral|white|black)-/;
  const all = Object.keys(TOKENS.root).filter((k) => !primitive.test(k));
  const groups = {};
  for (const k of all) {
    const g = k.startsWith('color-') ? `color-${k.split('-')[1]}` : k.split('-')[0];
    (groups[g] ??= []).push(k);
  }
  const darkDiff = Object.keys(TOKENS.dark).filter((k) => TOKENS.dark[k] !== TOKENS.root[k]);
  if (Object.keys(TOKENS.dark).length && !darkDiff.length)
    o += notice('Dark mode ships the light values', `\`tokens-dark.css\` redeclares ${Object.keys(TOKENS.dark).length} tokens, and every one has the same value as in light at \`${SHORT}\`. The dark column below shows that. It is a design gap to close in Figma's dark mode, not here.`);
  for (const [g, ks] of Object.entries(groups)) {
    o += `## ${g}\n\n| Token | Light | Dark |\n|---|---|---|\n`;
    o += ks.map((k) => `| ${codeCell('--' + k)} | ${codeCell(TOKENS.root[k])} | ${TOKENS.dark[k] !== undefined ? codeCell(TOKENS.dark[k]) : '*not redeclared*'} |`).join('\n') + '\n\n';
  }
  o += `## Typography modes\n\n| Token | English | Burmese |\n|---|---|---|\n`;
  o += Object.keys(TOKENS.english).map((k) => `| ${codeCell('--' + k)} | ${codeCell(TOKENS.english[k])} | ${TOKENS.burmese[k] !== undefined ? codeCell(TOKENS.burmese[k]) : '—'} |`).join('\n') + '\n';
  o += footer();
  write('core/tokens.mdx', o);
}

// Changelog
{
  let o = fm({ title: 'Changelog', description: 'What changed, release by release.' });
  o += `import { Aside } from '@astrojs/starlight/components';\n\n`;
  const changelogMd = show('CHANGELOG.md');
  if (changelogMd) o += `From [\`CHANGELOG.md\`](${blob('CHANGELOG.md')}):\n\n` + changelogMd.replace(/^# .*\n/, '') + '\n';
  else o += `There is no \`CHANGELOG.md\` at \`${SHORT}\`. Below is the git history of what a consumer imports (\`src/\`, \`tokens/\`, \`package.json\`, \`README.md\`), grouped by the release that first contained it.\n\n`;
  const log = git('log', '--format=%H%x09%cs%x09%s', SHA, '--', 'src', 'tokens', 'package.json', 'README.md')
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split('\t'))
    .map(([h, d, s]) => ({ h, d, s, v: shippedIn(h) }));
  const byV = {};
  for (const e of log) (byV[e.v ?? 'Unreleased'] ??= []).push(e);
  for (const [v, es] of Object.entries(byV)) {
    o += `## ${v === 'Unreleased' ? `Unreleased (package.json reads ${pkg.version})` : v}\n\n| Date | Commit | Subject |\n|---|---|---|\n`;
    o += es.map((e) => `| ${e.d} | <a href="${REPO}/commit/${e.h}"><code>${e.h.slice(0, 7)}</code></a> | ${cell(e.s)} |`).join('\n') + '\n\n';
  }
  o += footer();
  write('get-started/changelog.mdx', o);
}

// Roadmap
{
  let o = fm({ title: 'Roadmap', description: 'What is on the board and not released yet.' });
  o += `import { Aside } from '@astrojs/starlight/components';\n\n`;
  o += `From the registry's statuses (\`data/board.json\`, read ${board.readAt}). The board states no dates, owners or priorities, so neither does this page.\n\n`;
  const upcoming = board.components.filter((c) => !eligible.includes(c));
  if (!upcoming.length) o += `Every component on the board is documented already. Nothing is in design or build.\n\n`;
  else o += `| Component | Design | Development | Release verdict |\n|---|---|---|---|\n` + upcoming.map((c) => `| ${esc(c.name)} | ${esc(c.design ?? '—')} | ${esc(c.development ?? '—')} | ${esc(c.releaseVerdict ?? '—')} |`).join('\n') + '\n\n';
  const pending = eligible.filter((c) => c.development !== 'Released');
  if (pending.length) o += `Reviewed and cleared, not yet released: ${pending.map((c) => esc(c.name)).join(', ')}.\n\n`;
  o += footer();
  write('get-started/roadmap.mdx', o);
}

// News
{
  let o = fm({ title: 'News', description: 'Releases, as they are published.' });
  o += `import { Aside } from '@astrojs/starlight/components';\n\n`;
  if (!TAGS.length) o += notice('Nothing published yet', `No \`v*\` tag exists in the repo, so there is no release to announce. \`package.json\` at \`${SHORT}\` reads \`${pkg.version}\`.`);
  for (const t of TAGS) o += `## ${t.version}\n\n\`${pkg.name}@${t.version}\` was published on ${t.date}. See the [changelog](/get-started/changelog/).\n\n`;
  o += footer();
  write('get-started/news.mdx', o);
}

// Token CSS for the site theme, and the generated sidebar list
mkdirSync(join(GEN, 'tokens'), { recursive: true });
for (const f of ['tokens.css', 'tokens-dark.css', 'tokens-english.css', 'tokens-burmese.css'])
  copyFileSync(join(resolve(args.tokens), f), join(GEN, 'tokens', f));
writeFileSync(
  join(GEN, 'sidebar-components.json'),
  JSON.stringify(
    [{ label: 'All components', slug: 'core/components/overview' }, ...eligible.map((c) => ({ label: c.name, slug: `core/components/${slug(c.name)}` }))],
    null,
    2,
  ) + '\n',
);
writeFileSync(join(GEN, 'commit.json'), JSON.stringify({ commit: SHA, short: SHORT, date: COMMIT_DATE, boardReadAt: board.readAt, figmaReadAt: figma.readAt }, null, 2) + '\n');

console.log(`Generated at ${SHORT}: ${written.length} pages`);
for (const w of written) console.log(`  ${w}`);
if (notEligible.length) console.log(`Not documented (not Completed/Released + Cleared): ${notEligible.map((c) => c.name).join(', ')}`);
