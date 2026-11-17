import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { IconBtn } from './IconBtn';

describe('IconBtn', () => {
  it('renders the Figma defaults: idle, favorite icon, accessible name', () => {
    const html = renderToStaticMarkup(<IconBtn />);
    expect(html).toContain('class="hds-iconbtn"');
    expect(html).toContain('data-state="idle"');
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Save to favourites"');
    expect(html).toMatch(/material-symbols-rounded" aria-hidden="true">favorite</);
  });

  for (const state of ['idle', 'hover'] as const) {
    it(`state=${state}`, () => {
      expect(renderToStaticMarkup(<IconBtn state={state} />)).toContain(`data-state="${state}"`);
    });
  }

  it('takes icon, aria-label, className and native props', () => {
    const html = renderToStaticMarkup(<IconBtn icon="share" aria-label="Share" className="x" disabled />);
    expect(html).toContain('>share</span>');
    expect(html).toContain('aria-label="Share"');
    expect(html).toContain('class="hds-iconbtn x"');
    expect(html).toContain('disabled=""');
  });
});
