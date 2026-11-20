import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CardText } from './CardText';

const render = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('CardText', () => {
  it('renders the Figma defaults: showMetadata, showReview and showPrice all on', () => {
    const html = render(<CardText />);
    expect(html).toContain('>Casa do Bairro</p>');
    expect(html).toContain('>Alfama, Lisbon · 1.2 km from centre</p>');
    expect(html).toContain('class="hds-card-text__metadata"');
    expect(html).toContain('>4.7</p>');
    expect(html).toContain('>(318 reviews)</p>');
    expect(html).toContain('>121 EUR</p>');
    expect(html).toContain('>per night</p>');
  });

  for (const showMetadata of [true, false]) {
    for (const showReview of [true, false]) {
      for (const showPrice of [true, false]) {
        it(`showMetadata=${showMetadata} showReview=${showReview} showPrice=${showPrice}`, () => {
          const html = render(<CardText showMetadata={showMetadata} showReview={showReview} showPrice={showPrice} />);
          expect(html.includes('hds-card-text__metadata')).toBe(showMetadata);
          expect(html.includes('hds-card-text__rating')).toBe(showMetadata && showReview);
          expect(html.includes('hds-card-text__price')).toBe(showMetadata && showPrice);
          expect(html).toContain('hds-card-text__title');
        });
      }
    }
  }

  it('renders the text props it is given', () => {
    const html = render(
      <CardText title="T" subtitle="S" rating="5.0" reviews="(1 review)" amount="90 EUR" unit="per stay" />,
    );
    for (const text of ['T', 'S', '5.0', '(1 review)', '90 EUR', 'per stay']) expect(html).toContain(`>${text}</p>`);
  });
});
