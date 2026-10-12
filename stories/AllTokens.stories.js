import { esc, isColor, page, tokens } from './tokens.js';

export default { title: 'Tokens/All Tokens' };

const preview = (t) => {
  if (isColor(t.value) || /gradient\(/.test(t.value)) return `<div class="tk-mini tk-checker"><div style="width:100%;height:100%;border-radius:5px;background:var(${t.name})"></div></div>`;
  return '';
};

export const Table = {
  render: () => {
    const rows = tokens
      .map(
        (t) => `<tr data-q="${esc(`${t.name} ${t.value}`.toLowerCase())}"><td>${preview(t)}</td><td><code class="tk-code">${esc(t.name)}</code></td><td class="tk-value">${esc(t.value)}</td><td class="tk-value">${esc(t.dark && t.dark !== t.value ? t.dark : '')}</td></tr>`,
      )
      .join('');
    const el = page(
      'All tokens',
      `Every CSS custom property in <code>build/css/tokens.css</code> (${tokens.length}). Dark column lists values that differ in <code>tokens-dark.css</code>.`,
      `<input class="tk-search" type="search" placeholder="Filter by name or value…" aria-label="Filter tokens">
       <table class="tk-table"><thead><tr><th></th><th>Token</th><th>Value</th><th>Dark</th></tr></thead><tbody>${rows}</tbody></table>`,
    );
    el.querySelector('input').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      for (const tr of el.querySelectorAll('tbody tr')) tr.hidden = q && !tr.dataset.q.includes(q);
    });
    return el;
  },
};
