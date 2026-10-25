// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=280-276
// fileKey l87TswOf2FHCxsYmK8XhHJ · component set "Btn" 280:276
// Matrix (4 x 2): state (default, hover, focus, disabled) x shape (fill, outline)
//   fill:    default 280:256 (Figma spells it "defaul") · hover 280:277 · focus 280:285 · disabled 280:292
//   outline: default 280:333 · hover 280:339 · focus 280:347 · disabled 280:353
// Booleans: showLeadingIcon, showTrailingIcon (both default true) — covered by the icon stories.
// Labels match the Figma text layer "Button". The `state` stories pin each look; the Interactive
// story shows the same looks coming from real hover, keyboard focus and the disabled attribute.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'hover', 'focus', 'disabled'] },
    shape: { control: 'inline-radio', options: ['fill', 'outline'] },
    showLeadingIcon: { control: 'boolean' },
    showTrailingIcon: { control: 'boolean' },
    leadingIcon: { control: 'text', description: 'Code only: Material Symbols name.' },
    trailingIcon: { control: 'text', description: 'Code only: Material Symbols name.' },
    disabled: { control: 'boolean' },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
    children: { control: 'text', description: 'The label (Figma text layer).' },
    className: { control: false },
  },
  args: {
    state: 'default',
    shape: 'fill',
    showLeadingIcon: true,
    showTrailingIcon: true,
    children: 'Button',
    onClick: fn(),
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultFill: Story = {
  name: 'Button / state=default, shape=fill',
  args: { state: 'default', shape: 'fill' },
};
export const HoverFill: Story = {
  name: 'Button / state=hover, shape=fill',
  args: { state: 'hover', shape: 'fill' },
};
export const FocusFill: Story = {
  name: 'Button / state=focus, shape=fill',
  args: { state: 'focus', shape: 'fill' },
};
export const DisabledFill: Story = {
  name: 'Button / state=disabled, shape=fill',
  args: { state: 'disabled', shape: 'fill' },
};
export const DefaultOutline: Story = {
  name: 'Button / state=default, shape=outline',
  args: { state: 'default', shape: 'outline' },
};
export const HoverOutline: Story = {
  name: 'Button / state=hover, shape=outline',
  args: { state: 'hover', shape: 'outline' },
};
export const FocusOutline: Story = {
  name: 'Button / state=focus, shape=outline',
  args: { state: 'focus', shape: 'outline' },
};
export const DisabledOutline: Story = {
  name: 'Button / state=disabled, shape=outline',
  args: { state: 'disabled', shape: 'outline' },
};

export const NoLeadingIcon: Story = {
  name: 'Button / showLeadingIcon=false',
  args: { showLeadingIcon: false },
};
export const NoTrailingIcon: Story = {
  name: 'Button / showTrailingIcon=false',
  args: { showTrailingIcon: false },
};
export const LabelOnly: Story = {
  name: 'Button / showLeadingIcon=false, showTrailingIcon=false',
  args: { showLeadingIcon: false, showTrailingIcon: false },
};

/** Real behaviour: hover with the pointer, Tab to focus, click. The disabled one ignores clicks. */
export const Interactive: Story = {
  name: 'Button / interactive (hover, focus, click, disabled)',
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
      <Button {...args} shape="fill">
        Fill
      </Button>
      <Button {...args} shape="outline">
        Outline
      </Button>
      <Button {...args} shape="fill" disabled>
        Disabled fill
      </Button>
      <Button {...args} shape="outline" disabled>
        Disabled outline
      </Button>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /^Fill$/ }));
    await userEvent.click(canvas.getByRole('button', { name: /^Outline$/ }));
    await expect(args.onClick).toHaveBeenCalledTimes(2);
    await expect(canvas.getByRole('button', { name: /Disabled fill/ })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /Disabled outline/ })).toBeDisabled();
  },
};
