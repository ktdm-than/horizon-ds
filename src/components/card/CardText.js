// CardText — Figma component 162:27 (booleans: metadata, review, price)
import './Card.css';
import { esc } from './esc.js';

/**
 * @param {object} p
 * @param {boolean} [p.metadata=true]  Shows the metadata group (Review + Price).
 * @param {boolean} [p.review=true]
 * @param {boolean} [p.price=true]
 * @param {string} [p.title]  [p.subtitle]  [p.rating]  [p.reviews]  [p.amount]  [p.unit]
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
    ? `<p class="hds-card-text__review"><span class="hds-card-text__rating">${esc(rating)}</span> <span class="hds-card-text__secondary">${esc(reviews)}</span></p>`
    : '';
  const priceRow = price
    ? `<p class="hds-card-text__price"><span class="hds-card-text__amount">${esc(amount)}</span> <span class="hds-card-text__secondary">${esc(unit)}</span></p>`
    : '';
  const meta = metadata && (review || price) ? `<div class="hds-card-text__metadata">${reviewRow}${priceRow}</div>` : '';
  return `<div class="hds-card-text"><div class="hds-card-text__header"><p class="hds-card-text__title">${esc(title)}</p><p class="hds-card-text__subtitle">${esc(subtitle)}</p></div>${meta}</div>`;
}
