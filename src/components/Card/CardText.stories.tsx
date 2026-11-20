// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// fileKey l87TswOf2FHCxsYmK8XhHJ · section 227:333 · CardText 162:27 (nested in Card 218:143)
// Stories carry no fixed frame size: no size token exists for it.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardText } from './CardText';

const meta: Meta<typeof CardText> = {
  title: 'Components/Card/CardText',
  component: CardText,
  parameters: { layout: 'padded' },
  argTypes: {
    showMetadata: { control: 'boolean' },
    // showReview and showPrice live inside metadata, so they only apply while it is on.
    showReview: { control: 'boolean', if: { arg: 'showMetadata' } },
    showPrice: { control: 'boolean', if: { arg: 'showMetadata' } },
  },
  args: {
    showMetadata: true,
    showReview: true,
    showPrice: true,
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
export const TextNoMetadata: Story = { name: 'CardText / showMetadata=false', args: { showMetadata: false } };
export const TextNoReview: Story = { name: 'CardText / showReview=false', args: { showReview: false } };
export const TextNoPrice: Story = { name: 'CardText / showPrice=false', args: { showPrice: false } };
export const TextNoReviewNoPrice: Story = {
  name: 'CardText / showReview=false, showPrice=false',
  args: { showReview: false, showPrice: false },
};
// With showMetadata off, Review and Price are hidden whatever their value, as in Figma.
// These three complete the 8 Figma combinations.
export const TextNoMetadataNoReview: Story = {
  name: 'CardText / showMetadata=false, showReview=false',
  args: { showMetadata: false, showReview: false },
};
export const TextNoMetadataNoPrice: Story = {
  name: 'CardText / showMetadata=false, showPrice=false',
  args: { showMetadata: false, showPrice: false },
};
export const TextAllOff: Story = {
  name: 'CardText / all off',
  args: { showMetadata: false, showReview: false, showPrice: false },
};
