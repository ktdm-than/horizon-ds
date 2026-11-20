// CardText — Figma component 162:27 (booleans: showMetadata, showReview, showPrice)
// Section: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// Prop names match the Figma property names exactly (renamed in Figma per docs/card-build-report.md, N1).

export type CardTextProps = {
  /** Figma `showMetadata`. Shows the review and price block. */
  showMetadata?: boolean;
  /** Figma `showReview`. Only applies while `showMetadata` is on, as in Figma. */
  showReview?: boolean;
  /** Figma `showPrice`. Only applies while `showMetadata` is on, as in Figma. */
  showPrice?: boolean;
  title?: string;
  subtitle?: string;
  rating?: string;
  reviews?: string;
  amount?: string;
  unit?: string;
};

export function CardText({
  showMetadata = true,
  showReview = true,
  showPrice = true,
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
      {showMetadata && (
        <div className="hds-card-text__metadata">
          {showReview && (
            <div className="hds-card-text__row">
              <p className="hds-card-text__rating">{rating}</p>
              <p className="hds-card-text__meta">{reviews}</p>
            </div>
          )}
          {showPrice && (
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
