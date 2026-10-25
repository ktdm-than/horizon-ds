// Card — Figma component 218:143, in section 227:333 (properties: ContentSlot, showContentSlot)
// https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// Composition: CardContainer(state=hover) > containerSlot > CardLayout(horizontal) > CardImage(+ IconBtn) + CardData(CardText + ContentSlot)
import type { ReactNode } from 'react';
import { CardContainer } from './CardContainer';
import { CardLayout } from './CardLayout';
import type { CardLayoutImageProps } from './CardLayout';
import type { CardTextProps } from './CardText';
import './Card.css';

export { CardContainer, type CardContainerProps } from './CardContainer';
export { CardLayout, type CardLayoutProps, type CardLayoutImageProps } from './CardLayout';
export { CardImage, type CardImageProps } from './CardImage';
export { CardText, type CardTextProps } from './CardText';

export type CardProps = {
  /** Figma slot `ContentSlot`. Passed to the nested CardLayout's ContentSlot. */
  children?: ReactNode;
  /** Figma `showContentSlot`. Passed to the nested CardLayout. */
  showContentSlot?: boolean;
  /** Props for the nested CardImage. Its ratio is fixed at 1:1, as in Figma. */
  image?: CardLayoutImageProps;
  /** Props for the nested CardText (Metadata, Review, Price and the text). */
  text?: CardTextProps;
};

export function Card({ children, showContentSlot = true, image, text }: CardProps) {
  // Figma: the Card instance sets CardContainer to state=hover, so elevation/level1 is always on.
  return (
    <div className="hds-card">
      <CardContainer state="hover">
        <CardLayout orientation="horizontal" showContentSlot={showContentSlot} image={image} text={text}>
          {children}
        </CardLayout>
      </CardContainer>
    </div>
  );
}
