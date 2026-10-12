import { byPrefix, meta, page } from './tokens.js';

export default { title: 'Tokens/Spacing' };

export const Scale = {
  render: () =>
    page(
      'Spacing',
      'Spacing scale for padding, gaps and margins. Negative values are shown in red.',
      byPrefix('--spacing-')
        .map(
          (t) => `<div class="tk-row">${meta(t)}<div><div class="tk-bar" style="width: calc(${t.value.replace('-', '')} * 4); min-width: 1px; ${t.value.startsWith('-') ? 'background:#f4320b' : ''}"></div></div></div>`,
        )
        .join(''),
    ),
};
