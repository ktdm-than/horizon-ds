import { byPrefix, meta, page, section } from './tokens.js';

export default { title: 'Tokens/Elevation' };

const all = byPrefix('--elevation-');
const levels = all.filter((t) => /^--elevation-level\d+$/.test(t.name));
const parts = all.filter((t) => !levels.includes(t));

export const Levels = {
  render: () =>
    page(
      'Elevation',
      'Composite <code>box-shadow</code> values from <code>effects.styles.tokens.json</code>, plus the primitive parts they are built from.',
      section(
        'levels',
        `<div class="tk-elev-wrap">${levels
          .map((t) => `<div><div class="tk-elev" style="box-shadow: var(${t.name})">${t.name.replace('--elevation-', '')}</div><div style="margin-top:12px">${meta(t)}</div></div>`)
          .join('')}</div>`,
      ) + section('primitives', parts.map((t) => `<div class="tk-row">${meta(t)}<div></div></div>`).join('')),
    ),
};
