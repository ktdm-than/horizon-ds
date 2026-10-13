// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=162-27
// fileKey l87TswOf2FHCxsYmK8XhHJ · CardText 162:27 (nested in Card 218:143)
// The 278 frame width is a story fixture matching the Figma frame.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardText } from './CardText';

const meta: Meta<typeof CardText> = {
  title: 'Components/Card/CardText',
  component: CardText,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 278 }}><Story /></div>],
  argTypes: {
    metadata: { control: 'boolean' },
    review: { control: 'boolean' },
    price: { control: 'boolean' },
  },
  args: {
    metadata: true,
    review: true,
    price: true,
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
export const TextNoMetadata: Story = { name: 'CardText / metadata=false', args: { metadata: false } };
export const TextNoReview: Story = { name: 'CardText / review=false', args: { review: false } };
export const TextNoPrice: Story = { name: 'CardText / price=false', args: { price: false } };
