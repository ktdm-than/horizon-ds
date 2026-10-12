// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=163-74
// fileKey l87TswOf2FHCxsYmK8XhHJ · IconBtn 163:74 (nested in Card 218:143 via CardImage 163:56)
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconBtn } from './IconBtn';

const meta: Meta<typeof IconBtn> = {
  title: 'Components/IconBtn',
  component: IconBtn,
  parameters: { layout: 'padded' },
  argTypes: { state: { control: 'inline-radio', options: ['idle', 'hover'] } },
};
export default meta;
type Story = StoryObj<typeof IconBtn>;

export const Idle: Story = { name: 'IconBtn / state=idle', args: { state: 'idle' } };
export const Hover: Story = { name: 'IconBtn / state=hover', args: { state: 'hover' } };
