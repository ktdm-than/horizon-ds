// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// fileKey l87TswOf2FHCxsYmK8XhHJ · section 227:333 · CardText 162:27 (nested in Card 218:143)
// The 278 frame width is a story fixture matching the Figma frame.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardText } from './CardText';

const meta: Meta<typeof CardText> = {
  title: 'Components/Card/CardText',
  component: CardText,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 278 }}><Story /></div>],
  argTypes: {
    Metadata: { control: 'boolean' },
    // Review and Price live inside metadata, so they only apply while it is on.
    Review: { control: 'boolean', if: { arg: 'Metadata' } },
    Price: { control: 'boolean', if: { arg: 'Metadata' } },
  },
  args: {
    Metadata: true,
    Review: true,
    Price: true,
    title: 'Casa do Bairro',
    subtitle: 'Alfama, Lisbon · 1.2 km from centre',
    rating: '4.7',
    reviews: '(318 reviews)',
    amount: '121 EUR',
    unit: 'per night',
  },
};
export default meta;
type Story = StoryObj<typeof CardText>;

export const TextDefault: Story = { name: 'CardText / all on' };
export const TextNoMetadata: Story = { name: 'CardText / Metadata=false', args: { Metadata: false } };
export const TextNoReview: Story = { name: 'CardText / Review=false', args: { Review: false } };
export const TextNoPrice: Story = { name: 'CardText / Price=false', args: { Price: false } };
