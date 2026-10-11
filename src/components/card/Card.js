// Card — Figma component 218:143
// https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=218-143
// Composition: CardContainer > containerSlot > CardLayout(horizontal) > CardImage + CardData(CardText + ContentSlot)
import './Card.css';
import { CardContainer } from './CardContainer.js';
import { CardLayout } from './CardLayout.js';

export { CardContainer } from './CardContainer.js';
export { CardLayout } from './CardLayout.js';
export { CardImage } from './CardImage.js';
export { CardText } from './CardText.js';
export { IconBtn } from './IconBtn.js';

/**
 * Card has no variant properties of its own in Figma.
 * @param {object} p
 * @param {string} [p.children='']  HTML for the nested ContentSlot.
 * @param {object} [p.image]  Props for CardImage.
 * @param {object} [p.text]   Props for CardText.
 */
export function Card({ children = '', image = {}, text = {} } = {}) {
  // Figma: the Card instance sets CardContainer to state=hover, so elevation/level1 is always on.
  return `<div class="hds-card">${CardContainer({
    state: 'hover',
    children: CardLayout({ orientation: 'horizontal', children, image, text }),
  })}</div>`;
}
