// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=163-56
// fileKey l87TswOf2FHCxsYmK8XhHJ · CardImage 163:56 (nested in Card 218:143)
// Frame widths are story fixtures matching the Figma frames: 192 for 1:1, 256 for 4:3.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardImage } from './CardImage';

const meta: Meta<typeof CardImage> = {
  title: 'Components/Card/CardImage',
  component: CardImage,
  parameters: { layout: 'padded' },
  decorators: [
    (Story, { args }) => (
      <div style={{ width: args.ratio === '4:3' ? 256 : 192 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    ratio: { control: 'inline-radio', options: ['1:1', '4:3'] },
    state: { control: 'inline-radio', options: ['idle', 'hover'] },
    showIconBtn: { control: 'boolean' },
    src: { control: 'text' },
    alt: { control: 'text' },
    iconBtn: { control: 'object', description: 'Props for the overlaid IconBtn (e.g. aria-label).' },
  },
  args: { ratio: '1:1', state: 'idle', showIconBtn: true },
};
export default meta;
type Story = StoryObj<typeof CardImage>;

export const Image11Idle: Story = { name: 'CardImage / ratio=1:1, state=idle', args: { ratio: '1:1', state: 'idle' } };
export const Image11Hover: Story = { name: 'CardImage / ratio=1:1, state=hover', args: { ratio: '1:1', state: 'hover' } };
export const Image43Idle: Story = { name: 'CardImage / ratio=4:3, state=idle', args: { ratio: '4:3', state: 'idle' } };
export const Image43Hover: Story = { name: 'CardImage / ratio=4:3, state=hover', args: { ratio: '4:3', state: 'hover' } };
export const ImageNoIconBtn: Story = { name: 'CardImage / showIconBtn=false', args: { showIconBtn: false } };
