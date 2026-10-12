// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=218-143
// fileKey l87TswOf2FHCxsYmK8XhHJ · Card 218:143
// Nested component sets: CardContainer 163:45 · CardLayout 166:221 · CardImage 163:56 · IconBtn 163:74 · CardText 162:27
//
// One story per row of the variant matrix. The frame widths below are story fixtures
// that reproduce the Figma frame sizes for side-by-side comparison; the components
// fill their parent's width.
import { Card, CardContainer, CardLayout, CardImage, CardText, IconBtn } from './Card.js';

export default {
  title: 'Components/Card',
  parameters: { layout: 'padded' },
};

const frame = (width, html) => `<div style="width:${width}px">${html}</div>`;

// ---- Card 218:143 (no variant properties) ----
export const CardDefault = { name: 'Card / Default', render: () => frame(534, Card()) };

// ---- CardContainer 163:45 · state ----
const slotFill = '<div style="height:104px"></div>';
export const ContainerIdle = { name: 'CardContainer / state=idle', render: () => frame(424, CardContainer({ state: 'idle', children: slotFill })) };
export const ContainerHover = { name: 'CardContainer / state=hover', render: () => frame(424, CardContainer({ state: 'hover', children: slotFill })) };

// ---- CardLayout 166:221 · orientation × showContentSlot ----
export const LayoutHorizontal = { name: 'CardLayout / orientation=horizontal', render: () => frame(453, CardLayout({ orientation: 'horizontal' })) };
export const LayoutVertical = { name: 'CardLayout / orientation=vertical', render: () => frame(302, CardLayout({ orientation: 'vertical' })) };
export const LayoutHorizontalNoSlot = { name: 'CardLayout / horizontal, showContentSlot=false', render: () => frame(453, CardLayout({ orientation: 'horizontal', showContentSlot: false })) };
export const LayoutVerticalNoSlot = { name: 'CardLayout / vertical, showContentSlot=false', render: () => frame(302, CardLayout({ orientation: 'vertical', showContentSlot: false })) };

// ---- CardImage 163:56 · ratio × state, plus showIconBtn ----
export const Image11Idle = { name: 'CardImage / ratio=1:1, state=idle', render: () => frame(192, CardImage({ ratio: '1:1', state: 'idle' })) };
export const Image11Hover = { name: 'CardImage / ratio=1:1, state=hover', render: () => frame(192, CardImage({ ratio: '1:1', state: 'hover' })) };
export const Image43Idle = { name: 'CardImage / ratio=4:3, state=idle', render: () => frame(256, CardImage({ ratio: '4:3', state: 'idle' })) };
export const Image43Hover = { name: 'CardImage / ratio=4:3, state=hover', render: () => frame(256, CardImage({ ratio: '4:3', state: 'hover' })) };
export const ImageNoIconBtn = { name: 'CardImage / showIconBtn=false', render: () => frame(192, CardImage({ showIconBtn: false })) };

// ---- IconBtn 163:74 · state ----
export const IconBtnIdle = { name: 'IconBtn / state=idle', render: () => IconBtn({ state: 'idle' }) };
export const IconBtnHover = { name: 'IconBtn / state=hover', render: () => IconBtn({ state: 'hover' }) };

// ---- CardText 162:27 · metadata / review / price ----
export const TextDefault = { name: 'CardText / all on', render: () => frame(278, CardText()) };
export const TextNoMetadata = { name: 'CardText / metadata=false', render: () => frame(278, CardText({ metadata: false })) };
export const TextNoReview = { name: 'CardText / review=false', render: () => frame(278, CardText({ review: false })) };
export const TextNoPrice = { name: 'CardText / price=false', render: () => frame(278, CardText({ price: false })) };
