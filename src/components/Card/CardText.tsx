// CardText — Figma component 162:27 (booleans: metadata, review, price)
import './CardText.css';

export type CardTextProps = {
  /** Figma `metadata`. Shows the Review + Price block. */
  metadata?: boolean;
  /** Figma `review`. */
  review?: boolean;
  /** Figma `price`. */
  price?: boolean;
  title?: string;
  subtitle?: string;
  rating?: string;
  reviews?: string;
  amount?: string;
  unit?: string;
};

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
}: CardTextProps) {
  return (
    <div className="hds-card-text">
      <div className="hds-card-text__header">
        <p className="hds-card-text__title">{title}</p>
        <p className="hds-card-text__subtitle">{subtitle}</p>
      </div>
      {metadata && (
        <div className="hds-card-text__metadata">
          {review && (
            <div className="hds-card-text__row">
              <p className="hds-card-text__rating">{rating}</p>
              <p className="hds-card-text__meta">{reviews}</p>
            </div>
          )}
          {price && (
            <div className="hds-card-text__row">
              <p className="hds-card-text__price">{amount}</p>
              <p className="hds-card-text__meta">{unit}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
