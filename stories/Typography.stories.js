import { byPrefix, code, esc, page, section, tokens } from './tokens.js';

export default {
  title: 'Tokens/Typography',
  args: {
    sample: 'The quick brown fox jumps over the lazy dog',
    burmese: 'မြန်မာဘာသာစကား နမူနာစာသား',
  },
  argTypes: {
    sample: { control: 'text', name: 'English sample' },
    burmese: { control: 'text', name: 'Burmese sample' },
  },
};

// Composite text styles from typography.styles.tokens.json (CSS `font` shorthand).
const STYLE_GROUPS = ['heading', 'body', 'caption', 'label', 'action', 'list'];

export const TextStyles = {
  name: 'Text styles',
  render: ({ sample, burmese }) => {
    const body = STYLE_GROUPS.map((g) => {
      const list = byPrefix(`--${g}-`);
      if (!list.length) return '';
      return section(
        g,
        list
          .map(
            (t) => `<div class="tk-type">
              <div class="tk-meta">${code(`font: var(${t.name})`)}<span class="tk-value">${esc(t.value)}</span></div>
              <div class="tk-sample" style="font: var(${t.name}); color: var(--color-text-bold)">${esc(sample)}<br>${esc(burmese)}</div>
            </div>`,
          )
          .join(''),
      );
    }).join('');
    return page('Text styles', 'Composite styles exported as CSS <code>font</code> shorthands (weight size/line-height family).', body);
  },
};

const scale = (prefix, title, intro, styleFor) => ({
  name: title,
  render: ({ sample, burmese }) =>
    page(
      title,
      intro,
      byPrefix(prefix)
        .map(
          (t) => `<div class="tk-type">
            <div class="tk-meta">${code(`var(${t.name})`)}<span class="tk-value">${esc(t.value)}</span></div>
            <div class="tk-sample" style="${styleFor(t)}">${esc(sample)}<br>${esc(burmese)}</div>
          </div>`,
        )
        .join(''),
    ),
});

export const FontSizes = scale('--fontsize-', 'Font sizes', 'Raw size scale.', (t) => `font-size: var(${t.name}); line-height: 1.4`);

export const LineHeights = scale(
  '--lineheight-',
  'Line heights',
  'Raw line-height scale. The tinted band shows the line box.',
  (t) =>
    `font-size: 16px; line-height: var(${t.name}); background: repeating-linear-gradient(to bottom, #e7f0fe 0 var(${t.name}), #fefefe var(${t.name}) calc(var(${t.name}) * 2)); color: #1a1d20`,
);

export const FontWeights = scale(
  '--fontweight-',
  'Font weights',
  'Weight tokens are exported as Figma style <em>names</em> (e.g. “semibold”), which CSS does not accept as <code>font-weight</code>. Samples below map each name to its numeric weight so you can see the intent.',
  (t) => `font-family: var(--fontfamily-body); font-size: 20px; font-weight: ${({ regular: 400, medium: 500, semibold: 600, bold: 700 })[t.value] ?? `var(${t.name})`}`,
);

export const FontFamilies = scale('--fontfamily-', 'Font families', 'Typeface per text role.', (t) => `font-family: var(${t.name}); font-size: 20px`);

// Anything typographic that the stories above don't already cover.
export const Other = {
  name: 'Other',
  render: () => {
    const known = /^--(fontsize|lineheight|fontweight|fontfamily|heading|body|caption|label|action|list)-/;
    const rest = tokens.filter((t) => /^--(font|line|letter|text-?case|text-?decoration|paragraph)/.test(t.name) && !known.test(t.name));
    return page('Other typography tokens', rest.length ? '' : 'None right now — new typography token groups will appear here automatically.', section('tokens', rest.map((t) => `<p>${code(t.name)} ${esc(t.value)}</p>`).join('')));
  },
};
