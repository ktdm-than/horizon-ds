// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=166-221
// fileKey l87TswOf2FHCxsYmK8XhHJ · CardLayout 166:221 (nested in Card 218:143)
// Frame widths are story fixtures matching the Figma frames: 453 horizontal, 302 vertical.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardLayout } from './CardLayout';

const meta: Meta<typeof CardLayout> = {
  title: 'Components/Card/CardLayout',
  component: CardLayout,
  parameters: { layout: 'padded' },
  decorators: [
    (Story, { args }) => (
      <div style={{ width: args.orientation === 'vertical' ? 302 : 453 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    showContentSlot: { control: 'boolean' },
    image: { control: 'object', description: 'Props for the nested CardImage.' },
    text: { control: 'object', description: 'Props for the nested CardText.' },
    children: { control: false, description: 'Figma slot `ContentSlot`.' },
  },
  args: { showContentSlot: true },
};
export default meta;
type Story = StoryObj<typeof CardLayout>;

export const LayoutHorizontal: Story = { name: 'CardLayout / orientation=horizontal', args: { orientation: 'horizontal' } };
export const LayoutVertical: Story = { name: 'CardLayout / orientation=vertical', args: { orientation: 'vertical' } };
export const LayoutHorizontalNoSlot: Story = {
  name: 'CardLayout / horizontal, showContentSlot=false',
  args: { orientation: 'horizontal', showContentSlot: false },
};
export const LayoutVerticalNoSlot: Story = {
  name: 'CardLayout / vertical, showContentSlot=false',
  args: { orientation: 'vertical', showContentSlot: false },
};
