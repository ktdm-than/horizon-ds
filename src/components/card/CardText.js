// CardText — Figma component 162:27 (booleans: metadata, review, price)
import './Card.css';
import { esc } from './esc.js';

/**
 * @param {object} p
 * @param {boolean} [p.metadata=true]  Shows the Review + Price block.
 * @param {boolean} [p.review=true]
 * @param {boolean} [p.price=true]
 */
export function CardText({
  metadata = true,
  review = true,
  price = true,
  title = 'Casa do Bairro',
  subtitle = 'Alfama, Lisbon · 1.2 km from centre',
  rating = '4.7',
  reviews = '(318 reviews)',
  amount = '121 EUR',
  unit = 'per night',
} = {}) {
  const reviewRow = review
    ? `<div class="hds-card-text__row"><p class="hds-card-text__rating">${esc(rating)}</p><p class="hds-card-text__meta">${esc(reviews)}</p></div>`
    : '';
  const priceRow = price
    ? `<div class="hds-card-text__row hds-card-text__row--price"><p class="hds-card-text__price">${esc(amount)}</p><p class="hds-card-text__meta">${esc(unit)}</p></div>`
    : '';
  const meta = metadata && (review || price) ? `<div class="hds-card-text__metadata">${reviewRow}${priceRow}</div>` : '';
  return `<div class="hds-card-text"><div class="hds-card-text__header"><p class="hds-card-text__title">${esc(title)}</p><p class="hds-card-text__subtitle">${esc(subtitle)}</p></div>${meta}</div>`;
}
