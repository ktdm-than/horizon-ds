// IconBtn — Figma component set 163:74 (state = idle | hover)
import './Card.css';
import { esc } from './esc.js';

// at-icons:heart, exported from Figma (221:146). Figma fills it with #AD2408 = color/icon/accent/red;
// here the fill is currentColor so the token in Card.css supplies it (and follows dark mode).
const heart = `<svg class="hds-iconbtn__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M11.623 2C12.5186 2 13.3776 2.35579 14.0109 2.9891C14.6442 3.62241 15 4.48136 15 5.377V5.635C15 6.515 14.68 7.365 14.1 8.027L8 15L1.9 8.027C1.31996 7.36513 1.00012 6.51507 1 5.635V5.377C0.999915 4.6772 1.21724 3.99465 1.62192 3.42373C2.0266 2.8528 2.59866 2.4217 3.259 2.19002C3.91934 1.95834 4.63535 1.93753 5.30803 2.13046C5.98071 2.3234 6.57684 2.72054 7.014 3.267L8 4.5L8.986 3.268C9.30246 2.87258 9.70374 2.55334 10.1602 2.33386C10.6166 2.11438 11.1165 2.00029 11.623 2Z"/></svg>`;

/**
 * @param {object} p
 * @param {'idle'|'hover'} [p.state='idle']  Pins the Figma state. Real :hover applies regardless.
 * @param {string} [p.label='Save to favourites']  Accessible name; the button is icon-only.
 */
export function IconBtn({ state = 'idle', label = 'Save to favourites' } = {}) {
  return `<button type="button" class="hds-iconbtn" data-state="${esc(state)}" aria-label="${esc(label)}">${heart}</button>`;
}
