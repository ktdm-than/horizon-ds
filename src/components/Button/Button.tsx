// Button — Figma component set "Btn" 268:245 (size = small | medium | large, state = fill | outline)
// https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=268-245
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Figma `size`. DESIGN GAP: in Figma the three sizes differ only by a fixed width
   * (120 / 180 / 376) that is not bound to any token. No token carries those widths, so the
   * button hugs its label at every size until design binds one. Exposed as `data-size`.
   */
  size?: 'small' | 'medium' | 'large';
  /** Figma `state`: the visual treatment, `fill` (primary background) or `outline` (stroked). */
  state?: 'fill' | 'outline';
  /** The label. Figma models it as each variant's text layer, not as a component property. */
  children?: ReactNode;
};

export function Button({
  size = 'small',
  state = 'fill',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      data-size={size}
      data-state={state}
      className={['hds-button', className].filter(Boolean).join(' ')}
    >
      <span className="hds-button__label">{children}</span>
    </button>
  );
}
