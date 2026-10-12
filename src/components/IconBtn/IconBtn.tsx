// IconBtn — Figma component set 163:74 (state = idle | hover)
// https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=163-74
import type { ButtonHTMLAttributes } from 'react';
import './IconBtn.css';

export type IconBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Figma `state`. Pins the hover look; real pointer hover applies regardless. */
  state?: 'idle' | 'hover';
  /** Material Symbols name. Figma uses its own `at-icons:heart`; `favorite` is the Material equivalent. */
  icon?: string;
  /** Accessible name. The button is icon-only, so this is required to be meaningful. */
  'aria-label'?: string;
};

export function IconBtn({
  state = 'idle',
  icon = 'favorite',
  'aria-label': ariaLabel = 'Save to favourites',
  className,
  type = 'button',
  ...rest
}: IconBtnProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-label={ariaLabel}
      data-state={state}
      className={['hds-iconbtn', className].filter(Boolean).join(' ')}
    >
      <span className="hds-iconbtn__icon material-symbols-rounded" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
