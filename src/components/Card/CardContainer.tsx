// CardContainer — Figma component set 163:45 in section 227:333 (state = idle | hover, slot: containerSlot)
import type { ReactNode } from 'react';
import './CardContainer.css';

export type CardContainerProps = {
  /** Figma `state`. hover adds elevation/level1; real pointer hover applies regardless. */
  state?: 'idle' | 'hover';
  /** Figma slot `containerSlot`. */
  children?: ReactNode;
  className?: string;
};

export function CardContainer({ state = 'idle', children, className }: CardContainerProps) {
  return (
    <div className={['hds-card-container', className].filter(Boolean).join(' ')} data-state={state}>
      <div className="hds-card-container__slot">{children}</div>
    </div>
  );
}
