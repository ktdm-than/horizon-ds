// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// fileKey l87TswOf2FHCxsYmK8XhHJ · section 227:333 · Card 218:143
// The section holds Card and every part it composes. Each part has its own story file:
// CardContainer.stories.tsx (163:45), CardLayout.stories.tsx (166:221), CardImage.stories.tsx (163:56),
// CardText.stories.tsx (162:27); IconBtn 163:74 is in src/components/IconBtn/.
//
// Card properties in Figma: showContentSlot (boolean) and ContentSlot (slot → children).
// The 534 frame width is a story fixture matching the Figma frame; the Card fills its parent.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Card',
  component: Card,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 534 }}><Story /></div>],
  argTypes: {
    showContentSlot: { control: 'boolean' },
    image: { control: 'object', description: 'Props for the nested CardImage: state, showIconBtn, src, alt, iconBtn. Ratio is fixed at 1:1.' },
    text: { control: 'object', description: 'Props for the nested CardText (Metadata, Review, Price and the text fields).' },
    children: { control: false, description: 'Figma slot `ContentSlot`.' },
  },
  args: {
    showContentSlot: true,
    image: { showIconBtn: true },
    text: { Metadata: true, Review: true, Price: true },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const CardDefault: Story = { name: 'Card / showContentSlot=true' };
export const CardNoSlot: Story = { name: 'Card / showContentSlot=false', args: { showContentSlot: false } };
