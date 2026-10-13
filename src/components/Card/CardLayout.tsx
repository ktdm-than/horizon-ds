// CardLayout — Figma component set 166:221 (orientation = horizontal | vertical, showContentSlot, slot: ContentSlot)
import type { ReactNode } from 'react';
import { CardImage, type CardImageProps } from './CardImage';
import { CardText, type CardTextProps } from './CardText';
import './CardLayout.css';

export type CardLayoutProps = {
  /** Figma `orientation`. */
  orientation?: 'horizontal' | 'vertical';
  /** Figma `showContentSlot`. */
  showContentSlot?: boolean;
  /** Figma slot `ContentSlot`. */
  children?: ReactNode;
  /** Props for the nested CardImage. Its ratio is fixed at 1:1, as in Figma. */
  image?: Omit<CardImageProps, 'ratio'>;
  /** Props for the nested CardText. */
  text?: CardTextProps;
};

export function CardLayout({ orientation = 'horizontal', showContentSlot = true, children, image, text }: CardLayoutProps) {
  const horizontal = orientation === 'horizontal';
  const slot = showContentSlot && <div className="hds-card-layout__slot">{children}</div>;
  return (
    <div className="hds-card-layout" data-orientation={orientation}>
      <CardImage {...image} ratio="1:1" />
      {horizontal ? (
        // CardData: text + slot, gap spacing/2xl.
        <div className="hds-card-layout__data">
          <CardText {...text} />
          {slot}
        </div>
      ) : (
        <>
          <CardText {...text} />
          {slot}
        </>
      )}
    </div>
  );
}
