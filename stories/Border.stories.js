import { byPrefix, meta, page } from './tokens.js';

export default { title: 'Tokens/Border' };

export const Radius = {
  render: () =>
    page(
      'Border radius',
      '',
      `<div class="tk-grid">${byPrefix('--borderradius-')
        .map((t) => `<div><div class="tk-radius" style="border-radius: var(${t.name})"></div>${meta(t)}</div>`)
        .join('')}</div>`,
    ),
};

export const Width = {
  render: () =>
    page(
      'Border width',
      '',
      `<div class="tk-grid">${byPrefix('--borderwidth-')
        .map((t) => `<div><div class="tk-bw" style="border-width: var(${t.name})"></div>${meta(t)}</div>`)
        .join('')}</div>`,
    ),
};
