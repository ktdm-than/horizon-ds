// CardText — Figma component 162:27 (booleans: Metadata, Review, Price)
// Section: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// Prop names match the Figma property names exactly, including their capitals (see docs/card-build-report.md, N1).
import './CardText.css';

export type CardTextProps = {
  /** Figma `Metadata`. Shows the Review + Price block. */
  Metadata?: boolean;
  /** Figma `Review`. Only applies while `Metadata` is on, as in Figma. */
  Review?: boolean;
  /** Figma `Price`. Only applies while `Metadata` is on, as in Figma. */
  Price?: boolean;
  title?: string;
  subtitle?: string;
  rating?: string;
  reviews?: string;
  amount?: string;
  unit?: string;
};

export function CardText({
  Metadata = true,
  Review = true,
  Price = true,
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
      {Metadata && (
        <div className="hds-card-text__metadata">
          {Review && (
            <div className="hds-card-text__row">
              <p className="hds-card-text__rating">{rating}</p>
              <p className="hds-card-text__meta">{reviews}</p>
            </div>
          )}
          {Price && (
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
