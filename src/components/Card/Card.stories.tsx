// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=218-143
// fileKey l87TswOf2FHCxsYmK8XhHJ · Card 218:143
// Nested component sets: CardContainer 163:45 · CardLayout 166:221 · CardImage 163:56 · CardText 162:27
// IconBtn 163:74 has its own story file: src/components/IconBtn/IconBtn.stories.tsx
//
// One story per row of the variant matrix. The frame widths are story fixtures that
// reproduce the Figma frame sizes for comparison; the components fill their parent's width.
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Card, CardContainer, CardImage, CardLayout, CardText } from './Card';

const meta: Meta = {
  title: 'Components/Card',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// Fixture widths in px, matching the Figma frames.
const Frame = ({ width, children }: { width: number; children: ReactNode }) => <div style={{ width }}>{children}</div>;

// ---- Card 218:143 (no variant properties) ----
export const CardDefault: Story = { name: 'Card / Default', render: () => <Frame width={534}><Card /></Frame> };

// ---- CardContainer 163:45 · state ----
const SlotFill = () => <div style={{ height: 104 }} />;
export const ContainerIdle: Story = {
  name: 'CardContainer / state=idle',
  render: () => <Frame width={424}><CardContainer state="idle"><SlotFill /></CardContainer></Frame>,
};
export const ContainerHover: Story = {
  name: 'CardContainer / state=hover',
  render: () => <Frame width={424}><CardContainer state="hover"><SlotFill /></CardContainer></Frame>,
};

// ---- CardLayout 166:221 · orientation × showContentSlot ----
export const LayoutHorizontal: Story = {
  name: 'CardLayout / orientation=horizontal',
  render: () => <Frame width={453}><CardLayout orientation="horizontal" /></Frame>,
};
export const LayoutVertical: Story = {
  name: 'CardLayout / orientation=vertical',
  render: () => <Frame width={302}><CardLayout orientation="vertical" /></Frame>,
};
export const LayoutHorizontalNoSlot: Story = {
  name: 'CardLayout / horizontal, showContentSlot=false',
  render: () => <Frame width={453}><CardLayout orientation="horizontal" showContentSlot={false} /></Frame>,
};
export const LayoutVerticalNoSlot: Story = {
  name: 'CardLayout / vertical, showContentSlot=false',
  render: () => <Frame width={302}><CardLayout orientation="vertical" showContentSlot={false} /></Frame>,
};

// ---- CardImage 163:56 · ratio × state, plus showIconBtn ----
export const Image11Idle: Story = { name: 'CardImage / ratio=1:1, state=idle', render: () => <Frame width={192}><CardImage ratio="1:1" state="idle" /></Frame> };
export const Image11Hover: Story = { name: 'CardImage / ratio=1:1, state=hover', render: () => <Frame width={192}><CardImage ratio="1:1" state="hover" /></Frame> };
export const Image43Idle: Story = { name: 'CardImage / ratio=4:3, state=idle', render: () => <Frame width={256}><CardImage ratio="4:3" state="idle" /></Frame> };
export const Image43Hover: Story = { name: 'CardImage / ratio=4:3, state=hover', render: () => <Frame width={256}><CardImage ratio="4:3" state="hover" /></Frame> };
export const ImageNoIconBtn: Story = { name: 'CardImage / showIconBtn=false', render: () => <Frame width={192}><CardImage showIconBtn={false} /></Frame> };

// ---- CardText 162:27 · metadata / review / price ----
export const TextDefault: Story = { name: 'CardText / all on', render: () => <Frame width={278}><CardText /></Frame> };
export const TextNoMetadata: Story = { name: 'CardText / metadata=false', render: () => <Frame width={278}><CardText metadata={false} /></Frame> };
export const TextNoReview: Story = { name: 'CardText / review=false', render: () => <Frame width={278}><CardText review={false} /></Frame> };
export const TextNoPrice: Story = { name: 'CardText / price=false', render: () => <Frame width={278}><CardText price={false} /></Frame> };
