import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CardContainer } from './CardContainer';

describe('CardContainer', () => {
  it('defaults to state=idle and puts children in containerSlot', () => {
    const html = renderToStaticMarkup(<CardContainer><b>inside</b></CardContainer>);
    expect(html).toBe(
      '<div class="hds-card-container" data-state="idle"><div class="hds-card-container__slot"><b>inside</b></div></div>',
    );
  });

  it('state=hover', () => {
    expect(renderToStaticMarkup(<CardContainer state="hover" />)).toContain('data-state="hover"');
  });

  it('keeps className', () => {
    expect(renderToStaticMarkup(<CardContainer className="x" />)).toContain('class="hds-card-container x"');
  });
});
