// CardLayout — Figma component set 166:221 (orientation = horizontal | verticle, showContentSlot)
// "verticle" is spelled exactly as the Figma property value so the prop maps 1:1.
import './Card.css';
import { CardImage } from './CardImage.js';
import { CardText } from './CardText.js';

/**
 * @param {object} p
 * @param {'horizontal'|'verticle'} [p.orientation='horizontal']
 * @param {boolean} [p.showContentSlot=true]
 * @param {string} [p.children='']  HTML for ContentSlot.
 * @param {object} [p.image]  Props passed to CardImage.
 * @param {object} [p.text]   Props passed to CardText.
 */
export function CardLayout({ orientation = 'horizontal', showContentSlot = true, children = '', image = {}, text = {} } = {}) {
  const vertical = orientation === 'verticle';
  // Figma: the verticle variant hides the IconBtn on its CardImage instance.
  const img = CardImage({ ratio: '1:1', showIconBtn: !vertical, ...image });
  const slot = showContentSlot ? `<div class="hds-card-layout__slot" data-slot="ContentSlot">${children}</div>` : '';
  // Horizontal wraps text + slot in the CardData frame (172:253); verticle stacks them directly.
  const body = vertical ? `${CardText(text)}${slot}` : `<div class="hds-card-layout__data">${CardText(text)}${slot}</div>`;
  return `<div class="hds-card-layout" data-orientation="${vertical ? 'verticle' : 'horizontal'}">${img}${body}</div>`;
}
