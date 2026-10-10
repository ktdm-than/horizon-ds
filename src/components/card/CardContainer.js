// CardContainer — Figma component set 163:45 (state = idle | hover, containerSlot)
import './Card.css';
import { esc } from './esc.js';

/**
 * @param {object} p
 * @param {'idle'|'hover'} [p.state='idle']  hover adds elevation/level1. Real :hover also applies.
 * @param {string} [p.children='']  HTML for containerSlot.
 */
export function CardContainer({ state = 'idle', children = '' } = {}) {
  return `<div class="hds-card-container" data-state="${esc(state)}"><div class="hds-card-container__slot" data-slot="containerSlot">${children}</div></div>`;
}
