import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button, type ButtonShape, type ButtonState } from './Button';

const render = (el: React.ReactElement) => renderToStaticMarkup(el);

describe('Button', () => {
  it('renders the Figma defaults: fill, default state, both icons, label "Button"', () => {
    const html = render(<Button />);
    expect(html).toContain('class="hds-button"');
    expect(html).toContain('data-shape="fill"');
    expect(html).toContain('data-state="default"');
    expect(html).toContain('type="button"');
    expect(html).toContain('hds-button__icon--leading');
    expect(html).toContain('hds-button__icon--trailing');
    expect(html).toContain('<span class="hds-button__label">Button</span>');
    expect(html).not.toContain('disabled');
  });

  const shapes: ButtonShape[] = ['fill', 'outline'];
  const states: ButtonState[] = ['default', 'hover', 'focus', 'disabled'];
  for (const shape of shapes) {
    for (const state of states) {
      it(`shape=${shape} state=${state}`, () => {
        const html = render(<Button shape={shape} state={state} />);
        expect(html).toContain(`data-shape="${shape}"`);
        expect(html).toContain(`data-state="${state}"`);
        if (state === 'disabled') expect(html).toContain('disabled=""');
        else expect(html).not.toContain('disabled=""');
      });
    }
  }

  it('native disabled wins over a pinned state', () => {
    const html = render(<Button state="hover" disabled />);
    expect(html).toContain('data-state="disabled"');
    expect(html).toContain('disabled=""');
  });

  it('showLeadingIcon / showTrailingIcon hide each icon', () => {
    expect(render(<Button showLeadingIcon={false} />)).not.toContain('icon--leading');
    expect(render(<Button showTrailingIcon={false} />)).not.toContain('icon--trailing');
    const none = render(<Button showLeadingIcon={false} showTrailingIcon={false} />);
    expect(none).not.toContain('hds-button__icon');
  });

  it('icons are decorative Material Symbols, named by leadingIcon / trailingIcon', () => {
    const html = render(<Button leadingIcon="search" trailingIcon="arrow_forward" />);
    expect(html).toMatch(/icon--leading material-symbols-rounded" aria-hidden="true">search</);
    expect(html).toMatch(/icon--trailing material-symbols-rounded" aria-hidden="true">arrow_forward</);
  });

  it('renders children as the label, keeps className and passes other props through', () => {
    const html = render(
      <Button className="extra" type="submit" aria-describedby="hint">
        Book now
      </Button>,
    );
    expect(html).toContain('class="hds-button extra"');
    expect(html).toContain('type="submit"');
    expect(html).toContain('aria-describedby="hint"');
    expect(html).toContain('>Book now</span>');
  });
});
