// CardLayout — Figma component set 166:221 (orientation = horizontal | vertical, showContentSlot)
import './Card.css';
import { esc } from './esc.js';
import { CardImage } from './CardImage.js';
import { CardText } from './CardText.js';

/**
 * @param {object} p
 * @param {'horizontal'|'vertical'} [p.orientation='horizontal']
 * @param {boolean} [p.showContentSlot=true]
 * @param {string} [p.children='']  HTML for ContentSlot.
 * @param {object} [p.image]  Props for CardImage. Figma hides the IconBtn in the vertical variant.
 * @param {object} [p.text]   Props for CardText.
 */
export function CardLayout({ orientation = 'horizontal', showContentSlot = true, children = '', image = {}, text = {} } = {}) {
  const horizontal = orientation === 'horizontal';
  const img = CardImage({ ratio: '1:1', showIconBtn: horizontal, ...image });
  const slot = showContentSlot ? `<div class="hds-card-layout__slot">${children}</div>` : '';
  // Horizontal wraps text + slot in CardData (gap spacing/2xl); vertical stacks them directly (layout gap spacing/md).
  const body = horizontal ? `<div class="hds-card-layout__data">${CardText(text)}${slot}</div>` : `${CardText(text)}${slot}`;
  return `<div class="hds-card-layout" data-orientation="${esc(orientation)}">${img}${body}</div>`;
}
