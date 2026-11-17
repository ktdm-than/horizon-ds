import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

const render = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('Card', () => {
  it('composes CardContainer(state=hover) > CardLayout(horizontal) with the slot', () => {
    const html = render(<Card><i>slot</i></Card>);
    expect(html).toMatch(
      /^<div class="hds-card"><div class="hds-card-container" data-state="hover"><div class="hds-card-container__slot"><div class="hds-card-layout" data-orientation="horizontal">/,
    );
    expect(html).toContain('<div class="hds-card-layout__slot"><i>slot</i></div>');
  });

  it('showContentSlot=false hides the slot', () => {
    expect(render(<Card showContentSlot={false}><i>slot</i></Card>)).not.toContain('hds-card-layout__slot');
  });

  it('passes image and text props to the nested CardImage and CardText', () => {
    const html = render(<Card image={{ src: '/a.jpg', alt: 'Room', showIconBtn: false }} text={{ title: 'Other' }} />);
    expect(html).toContain('src="/a.jpg" alt="Room"');
    expect(html).not.toContain('hds-iconbtn');
    expect(html).toContain('>Other</p>');
  });
});
