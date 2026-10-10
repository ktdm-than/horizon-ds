// IconBtn — Figma component set 163:74 (state = idle | hover)
import './Card.css';
import { esc } from './esc.js';

/**
 * @param {object} p
 * @param {'idle'|'hover'} [p.state='idle']  Forces the Figma state. Real :hover also applies.
 * @param {string} [p.icon='♥']              Glyph shown in the button (Figma uses a text heart).
 * @param {string} [p.label='Save to favourites']  Accessible name; the button is icon-only.
 */
export function IconBtn({ state = 'idle', icon = '♥', label = 'Save to favourites' } = {}) {
  return `<button type="button" class="hds-iconbtn" data-state="${esc(state)}" aria-label="${esc(label)}"><span class="hds-iconbtn__icon" aria-hidden="true">${esc(icon)}</span></button>`;
}
