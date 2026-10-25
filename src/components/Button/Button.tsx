// Button — Figma component set "Btn" 280:276
// https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=280-276
// Figma properties: state (default | hover | focus | disabled) x shape (fill | outline),
// plus booleans showLeadingIcon and showTrailingIcon. The leading and trailing icons are the
// local Figma components LeadingIcon 280:255 and TrailingIcon 280:271 (a 20x20 "+" glyph).
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonState = 'default' | 'hover' | 'focus' | 'disabled';
export type ButtonShape = 'fill' | 'outline';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /**
   * Figma `state`. Pins a look for documentation and testing. Real pointer hover, keyboard
   * focus (`:focus-visible`) and the native `disabled` attribute apply the same looks on their own,
   * so leave this at `default` in product code. `disabled` here also disables the button natively.
   * Figma spells the fill variant's default `defaul` (typo); the code uses `default` (docs/button-build-report.md).
   */
  state?: ButtonState;
  /** Figma `shape`: `fill` (primary background) or `outline` (stroked, transparent background). */
  shape?: ButtonShape;
  /** Figma `showLeadingIcon`. Shows the icon before the label. Figma default: true. */
  showLeadingIcon?: boolean;
  /** Figma `showTrailingIcon`. Shows the icon after the label. Figma default: true. */
  showTrailingIcon?: boolean;
  /**
   * Code only (Figma has no instance-swap property for it): Material Symbols name of the leading
   * icon. Default `add`, the Material equivalent of Figma's "+" glyph.
   */
  leadingIcon?: string;
  /** Code only, as `leadingIcon`: Material Symbols name of the trailing icon. Default `add`. */
  trailingIcon?: string;
  /** The label. Figma models it as the text layer "Button", not as a component property. */
  children?: ReactNode;
};

/** Figma LeadingIcon 280:255 / TrailingIcon 280:271: a decorative 20x20 glyph. */
function ButtonIcon({ name, position }: { name: string; position: 'leading' | 'trailing' }) {
  return (
    <span
      className={`hds-button__icon hds-button__icon--${position} material-symbols-rounded`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export function Button({
  state = 'default',
  shape = 'fill',
  showLeadingIcon = true,
  showTrailingIcon = true,
  leadingIcon = 'add',
  trailingIcon = 'add',
  disabled,
  type = 'button',
  className,
  children = 'Button',
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || state === 'disabled';
  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      data-state={isDisabled ? 'disabled' : state}
      data-shape={shape}
      className={['hds-button', className].filter(Boolean).join(' ')}
    >
      {showLeadingIcon && <ButtonIcon name={leadingIcon} position="leading" />}
      <span className="hds-button__label">{children}</span>
      {showTrailingIcon && <ButtonIcon name={trailingIcon} position="trailing" />}
    </button>
  );
}
