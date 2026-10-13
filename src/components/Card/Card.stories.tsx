// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=218-143
// fileKey l87TswOf2FHCxsYmK8XhHJ · Card 218:143
// Nested parts have their own story files: CardContainer.stories.tsx (163:45), CardLayout.stories.tsx (166:221),
// CardImage.stories.tsx (163:56), CardText.stories.tsx (162:27); IconBtn 163:74 is in src/components/IconBtn/.
//
// Card has no Figma properties. Its controls are the content it passes to the nested CardImage and CardText.
// The 534 frame width is a story fixture matching the Figma frame; the Card fills its parent.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Card',
  component: Card,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 534 }}><Story /></div>],
  argTypes: {
    image: { control: 'object', description: 'Props for the nested CardImage: state, showIconBtn, src, alt, iconBtn. Ratio is fixed at 1:1.' },
    text: { control: 'object', description: 'Props for the nested CardText (metadata, review, price and the text fields).' },
    children: { control: false },
  },
  args: {
    image: { showIconBtn: true },
    text: { metadata: true, review: true, price: true },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const CardDefault: Story = { name: 'Card / Default' };
