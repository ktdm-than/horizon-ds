// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=268-245
// fileKey l87TswOf2FHCxsYmK8XhHJ · component set "Btn" 268:245
// Matrix (3 x 2): size (small, medium, large) x state (fill, outline)
//   small/fill 268:244 · medium/fill 268:246 · large/fill 268:248
//   small/outline 268:257 · medium/outline 268:262 · large/outline 268:264
// Labels match the Figma text layers. The two Disabled stories cover behaviour only: Figma models
// no disabled look. Per-size widths are a design gap (unbound in Figma).
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    state: { control: 'inline-radio', options: ['fill', 'outline'] },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    children: { control: 'text', description: 'The label (Figma text layer).' },
    className: { control: false },
  },
  args: { type: 'button', disabled: false, onClick: fn() },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const SmallFill: Story = {
  name: 'Button / size=small, state=fill',
  args: { size: 'small', state: 'fill', children: 'Small Btn' },
};
export const MediumFill: Story = {
  name: 'Button / size=medium, state=fill',
  args: { size: 'medium', state: 'fill', children: 'Medium Btn' },
};
export const LargeFill: Story = {
  name: 'Button / size=large, state=fill',
  args: { size: 'large', state: 'fill', children: 'Large Btn' },
};
export const SmallOutline: Story = {
  name: 'Button / size=small, state=outline',
  args: { size: 'small', state: 'outline', children: 'Small Btn' },
};
export const MediumOutline: Story = {
  name: 'Button / size=medium, state=outline',
  args: { size: 'medium', state: 'outline', children: 'Medium Btn' },
};
export const LargeOutline: Story = {
  name: 'Button / size=large, state=outline',
  args: { size: 'large', state: 'outline', children: 'Large Btn' },
};
export const DisabledFill: Story = {
  name: 'Button / state=fill, disabled (behaviour)',
  args: { size: 'small', state: 'fill', disabled: true, children: 'Small Btn' },
};
export const DisabledOutline: Story = {
  name: 'Button / state=outline, disabled (behaviour)',
  args: { size: 'small', state: 'outline', disabled: true, children: 'Small Btn' },
};
