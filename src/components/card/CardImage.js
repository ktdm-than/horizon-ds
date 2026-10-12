// CardImage — Figma component set 163:56 (ratio = 1:1 | 4:3, state = idle | hover, showIconBtn)
import './Card.css';
import { esc } from './esc.js';
import { IconBtn } from './IconBtn.js';

/**
 * Fills its parent's width; height follows the ratio.
 * @param {object} p
 * @param {'1:1'|'4:3'} [p.ratio='1:1']
 * @param {'idle'|'hover'} [p.state='idle']  hover shows the overlay gradient and IconBtn elevation. Real :hover applies regardless.
 * @param {boolean} [p.showIconBtn=true]
 * @param {string} [p.src]  Image URL. Without it the color/bg/surfaceSecondary placeholder shows, as in Figma.
 * @param {string} [p.alt='']
 */
export function CardImage({ ratio = '1:1', state = 'idle', showIconBtn = true, src, alt = '' } = {}) {
  const media = src ? `<img class="hds-card-image__media" src="${esc(src)}" alt="${esc(alt)}" />` : '';
  const action = showIconBtn ? IconBtn({ state }) : '';
  return `<div class="hds-card-image" data-ratio="${esc(ratio)}" data-state="${esc(state)}">${media}<div class="hds-card-image__overlay" aria-hidden="true"></div>${action}</div>`;
}
