// CardImage — Figma component set 163:56 (ratio = 1:1 | 4:3, state = idle | hover, showIconBtn)
import './Card.css';
import { esc } from './esc.js';
import { IconBtn } from './IconBtn.js';

/**
 * @param {object} p
 * @param {'1:1'|'4:3'} [p.ratio='1:1']
 * @param {'idle'|'hover'} [p.state='idle']  hover shows the overlay gradient. Real :hover also applies.
 * @param {boolean} [p.showIconBtn=true]
 * @param {string} [p.src]   Optional image URL. Without it the surfaceSecondary placeholder shows.
 * @param {string} [p.alt='']
 */
export function CardImage({ ratio = '1:1', state = 'idle', showIconBtn = true, src, alt = '' } = {}) {
  const img = src ? `<img class="hds-card-image__media" src="${esc(src)}" alt="${esc(alt)}" />` : '';
  return `<div class="hds-card-image" data-ratio="${esc(ratio)}" data-state="${esc(state)}">${img}<div class="hds-card-image__overlay" aria-hidden="true"></div>${
    showIconBtn ? `<div class="hds-card-image__action">${IconBtn({ state })}</div>` : ''
  }</div>`;
}
