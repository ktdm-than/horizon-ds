import { meta, page, tokens } from './tokens.js';

export default { title: 'Tokens/Gradient' };

const gradients = tokens.filter((t) => /gradient\(/.test(t.value));

export const Gradients = {
  render: () =>
    page(
      'Gradients',
      'Gradient tokens shown over a sample image area.',
      gradients
        .map(
          (t) => `<div style="margin-bottom:24px"><div class="tk-gradient" style="background: var(${t.name}), linear-gradient(135deg, #5c97f8, #0bf4cd)"><span>Media title</span></div><div style="margin-top:12px">${meta(t)}</div></div>`,
        )
        .join(''),
    ),
};
