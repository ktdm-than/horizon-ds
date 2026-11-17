import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CardText } from './CardText';

const render = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('CardText', () => {
  it('renders the Figma defaults: Metadata, Review and Price all on', () => {
    const html = render(<CardText />);
    expect(html).toContain('>Casa do Bairro</p>');
    expect(html).toContain('>Alfama, Lisbon · 1.2 km from centre</p>');
    expect(html).toContain('class="hds-card-text__metadata"');
    expect(html).toContain('>4.7</p>');
    expect(html).toContain('>(318 reviews)</p>');
    expect(html).toContain('>121 EUR</p>');
    expect(html).toContain('>per night</p>');
  });

  for (const Metadata of [true, false]) {
    for (const Review of [true, false]) {
      for (const Price of [true, false]) {
        it(`Metadata=${Metadata} Review=${Review} Price=${Price}`, () => {
          const html = render(<CardText Metadata={Metadata} Review={Review} Price={Price} />);
          expect(html.includes('hds-card-text__metadata')).toBe(Metadata);
          expect(html.includes('hds-card-text__rating')).toBe(Metadata && Review);
          expect(html.includes('hds-card-text__price')).toBe(Metadata && Price);
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
