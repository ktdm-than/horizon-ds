// Figma: https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
// fileKey l87TswOf2FHCxsYmK8XhHJ · section 227:333 · CardContainer 163:45 (nested in Card 218:143)
// Stories carry no fixed frame size: no size token exists for it. The slot holds sample text.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardContainer } from './CardContainer';

const meta: Meta<typeof CardContainer> = {
  title: 'Components/Card/CardContainer',
  component: CardContainer,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'inline-radio', options: ['idle', 'hover'] },
    children: { control: false, description: 'Figma slot `containerSlot`.' },
    className: { control: false },
  },
  args: { children: <p>Slot content</p> },
};
export default meta;
type Story = StoryObj<typeof CardContainer>;

export const ContainerIdle: Story = { name: 'CardContainer / state=idle', args: { state: 'idle' } };
export const ContainerHover: Story = { name: 'CardContainer / state=hover', args: { state: 'hover' } };
