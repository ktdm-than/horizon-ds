import { byPrefix, esc, groupBy, meta, page, section } from './tokens.js';

export default { title: 'Tokens/Core Colours' };

const SEMANTIC = /^--color-(bg|text|icon|border|overlay)-/;
const core = byPrefix('--color-').filter((t) => !SEMANTIC.test(t.name));

const swatch = (t) =>
  `<div class="tk-swatch"><div class="tk-chipfill tk-checker"><div style="background:var(${t.name})"></div></div>${meta(t)}</div>`;

export const Palette = {
  render: () => {
    const hues = groupBy(core, (t) => t.name.replace('--color-', '').replace(/-\d+a?$/, ''));
    const body = [...hues]
      .map(([hue, list]) => section(hue, `<div class="tk-ramp">${list.map(swatch).join('')}</div>`))
      .join('');
    return page(
      'Core colours',
      `Primitive colour ramps from <code>core.default.tokens.json</code>. Prefer the semantic colours in components; these are the raw palette they reference. ${esc(core.length)} tokens.`,
      body,
    );
  },
};
