// Card — Figma component 218:143
// https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=218-143
// Composition: CardContainer(state=hover) > containerSlot > CardLayout(horizontal) > CardImage + CardData(CardText + ContentSlot)
import type { ReactNode } from 'react';
import { CardContainer } from './CardContainer';
import { CardLayout } from './CardLayout';
import type { CardLayoutProps } from './CardLayout';
import type { CardTextProps } from './CardText';
import './Card.css';

export { CardContainer, type CardContainerProps } from './CardContainer';
export { CardLayout, type CardLayoutProps } from './CardLayout';
export { CardImage, type CardImageProps } from './CardImage';
export { CardText, type CardTextProps } from './CardText';

export type CardProps = {
  /** The nested ContentSlot. */
  children?: ReactNode;
  /** Props for the nested CardImage. Its ratio is fixed at 1:1, as in Figma. */
  image?: CardLayoutProps['image'];
  /** Props for the nested CardText. */
  text?: CardTextProps;
};

/** Card has no variant properties of its own in Figma. */
export function Card({ children, image, text }: CardProps) {
  // Figma: the Card instance sets CardContainer to state=hover, so elevation/level1 is always on.
  return (
    <div className="hds-card">
      <CardContainer state="hover">
        <CardLayout orientation="horizontal" image={image} text={text}>
          {children}
        </CardLayout>
      </CardContainer>
    </div>
  );
}
