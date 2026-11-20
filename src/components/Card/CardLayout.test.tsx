import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CardLayout, type CardLayoutImageProps } from './CardLayout';

const render = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('CardLayout', () => {
  it('horizontal (default): image, then CardData holding text and ContentSlot', () => {
    const html = render(<CardLayout><i>slot</i></CardLayout>);
    expect(html).toContain('data-orientation="horizontal"');
    expect(html).toMatch(
      /hds-card-image.*<div class="hds-card-layout__data"><div class="hds-card-text">.*<div class="hds-card-layout__slot"><i>slot<\/i><\/div><\/div><\/div>$/,
    );
  });

  it('vertical: image, text and ContentSlot are direct children, no CardData', () => {
    const html = render(<CardLayout orientation="vertical"><i>slot</i></CardLayout>);
    expect(html).toContain('data-orientation="vertical"');
    expect(html).not.toContain('hds-card-layout__data');
    expect(html).toMatch(/<div class="hds-card-layout__slot"><i>slot<\/i><\/div><\/div>$/);
  });

  for (const orientation of ['horizontal', 'vertical'] as const) {
    it(`${orientation}: showContentSlot=false hides the slot`, () => {
      const html = render(<CardLayout orientation={orientation} showContentSlot={false}><i>slot</i></CardLayout>);
      expect(html).not.toContain('hds-card-layout__slot');
      expect(html).not.toContain('<i>slot</i>');
    });
  }

  it('fixes the nested image ratio at 1:1 and passes other image and text props', () => {
    const image = { ratio: '4:3', state: 'hover', src: '/a.jpg' } as unknown as CardLayoutImageProps;
    const html = render(<CardLayout image={image} text={{ title: 'Other', showPrice: false }} />);
    expect(html).toContain('data-ratio="1:1" data-state="hover"');
    expect(html).toContain('src="/a.jpg"');
    expect(html).toContain('>Other</p>');
    expect(html).not.toContain('hds-card-text__price');
  });
});
