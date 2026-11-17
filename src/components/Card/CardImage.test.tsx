import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CardImage } from './CardImage';

const render = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('CardImage', () => {
  it('renders the Figma defaults: 1:1, idle, IconBtn, placeholder (no img)', () => {
    const html = render(<CardImage />);
    expect(html).toContain('data-ratio="1:1"');
    expect(html).toContain('data-state="idle"');
    expect(html).toContain('class="hds-card-image__overlay" aria-hidden="true"');
    expect(html).toContain('class="hds-iconbtn"');
    expect(html).not.toContain('<img');
  });

  for (const ratio of ['1:1', '4:3'] as const) {
    for (const state of ['idle', 'hover'] as const) {
      it(`ratio=${ratio} state=${state}, and the IconBtn follows the state`, () => {
        const html = render(<CardImage ratio={ratio} state={state} />);
        expect(html).toContain(`<div class="hds-card-image" data-ratio="${ratio}" data-state="${state}">`);
        expect(html).toMatch(new RegExp(`data-state="${state}" class="hds-iconbtn"`));
      });
    }
  }

  it('showIconBtn=false hides the IconBtn', () => {
    expect(render(<CardImage showIconBtn={false} />)).not.toContain('hds-iconbtn');
  });

  it('src renders the image with its alt', () => {
    expect(render(<CardImage src="/a.jpg" alt="Room" />)).toContain(
      '<img class="hds-card-image__media" src="/a.jpg" alt="Room"/>',
    );
  });

  it('passes iconBtn props through to the IconBtn', () => {
    expect(render(<CardImage iconBtn={{ 'aria-label': 'Save Casa', icon: 'bookmark' }} />)).toMatch(
      /aria-label="Save Casa".*>bookmark</,
    );
  });
});
