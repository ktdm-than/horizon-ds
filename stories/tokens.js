// Reads the CSS that Style Dictionary generates, so every story stays in sync
// with `npm run build:tokens` — no token values are duplicated here.
import lightCss from '../build/css/tokens.css?raw';
import darkCss from '../build/css/tokens-dark.css?raw';
import burmeseCss from '../build/css/tokens-burmese.css?raw';
import { createElement, useEffect, useRef } from 'react';

const parse = (css) => {
  const out = [];
  const re = /(--[\w-]+):\s*([^;]+);(?:\s*\/\*\*?\s*(.*?)\s*\*\/)?/g;
  let m;
  while ((m = re.exec(css))) out.push({ name: m[1], value: m[2].trim(), comment: m[3] ?? '' });
  return out;
};

export const tokens = parse(lightCss);
const dark = new Map(parse(darkCss).map((t) => [t.name, t.value]));
for (const t of tokens) t.dark = dark.get(t.name);
const burmese = new Map(parse(burmeseCss).map((t) => [t.name, t.value]));
for (const t of tokens) t.my = burmese.get(t.name);

// The value in the active typography mode: Burmese when the preview's Language is Burmese.
export const valueFor = (t) => (document.documentElement.lang === 'my' && t.my ? t.my : t.value);

export const byPrefix = (prefix) => tokens.filter((t) => t.name.startsWith(prefix));

const COLOR_RE = /^(#|rgba?\(|hsla?\()/;
export const isColor = (v) => COLOR_RE.test(v);

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Token stories build plain DOM. Mount hands that node to the React renderer as-is.
const Mount = ({ node }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.replaceChildren(node);
  }, [node]);
  return createElement('div', { ref });
};
export const mount = (node) => createElement(Mount, { node });

export const pageEl = (title, intro, body) => {
  const el = document.createElement('div');
  el.className = 'tk-page';
  el.innerHTML = `<h1>${esc(title)}</h1>${intro ? `<p class="tk-intro">${intro}</p>` : ''}${body}`;
  return el;
};

export const page = (title, intro, body) => mount(pageEl(title, intro, body));

export const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;

export const code = (s) => `<code class="tk-code">${esc(s)}</code>`;

// Name + value block shown under every specimen.
export const meta = (t) =>
  `<div class="tk-meta">${code(t.name)}<span class="tk-value">${esc(t.value)}</span>${
    t.dark && t.dark !== t.value ? `<span class="tk-value">dark: ${esc(t.dark)}</span>` : ''
  }${t.comment ? `<span class="tk-note">${esc(t.comment)}</span>` : ''}</div>`;

// Group tokens by the path segment(s) after a prefix, e.g. --color-bg-primary-idle -> "primary".
export const groupBy = (list, keyFn) => {
  const groups = new Map();
  for (const t of list) {
    const k = keyFn(t);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(t);
  }
  return groups;
};
