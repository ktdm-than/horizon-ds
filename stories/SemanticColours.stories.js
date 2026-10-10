import { byPrefix, groupBy, meta, page, section } from './tokens.js';

export default { title: 'Tokens/Semantic Colours' };

const swatch = (t) =>
  `<div class="tk-swatch"><div class="tk-chipfill tk-checker"><div style="background:var(${t.name})"></div></div>${meta(t)}</div>`;

// --color-text-brand -> "default"; --color-bg-primary-idle -> "primary"
const sub = (prefix) => (t) => {
  const rest = t.name.slice(prefix.length).split('-');
  return rest.length > 1 ? rest.slice(0, rest[0] === 'accent' || (rest[0] === 'primary' && rest[1] === 'neutral') ? 2 : 1).join(' ') : 'default';
};

const story = (title, group, intro) => ({
  name: title,
  render: () => {
    const prefix = `--color-${group}-`;
    const list = byPrefix(prefix);
    const body = [...groupBy(list, sub(prefix))]
      .map(([k, l]) => section(k, `<div class="tk-ramp">${l.map(swatch).join('')}</div>`))
      .join('');
    return page(
      `${title} colours`,
      `${intro} Switch <strong>Theme</strong> in the toolbar to preview the dark mode values; a “dark:” line appears under any token whose dark value differs. ${list.length} tokens.`,
      body,
    );
  },
});

export const Background = story('Background', 'bg', 'Surface and fill colours.');
export const Text = story('Text', 'text', 'Foreground colours for copy.');
export const Icon = story('Icon', 'icon', 'Foreground colours for icons.');
export const Border = story('Border', 'border', 'Stroke and divider colours.');
export const Overlay = story('Overlay', 'overlay', 'Scrims placed over content.');
