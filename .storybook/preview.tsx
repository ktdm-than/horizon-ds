import type { Preview } from '@storybook/react-vite';
import '../build/css/tokens.css';
import '../build/css/tokens-dark.css';
import '../build/css/tokens-burmese.css';
import '../stories/tokens.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Semantic colour mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    lang: {
      description: 'Typography mode',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'my', title: 'Burmese' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', lang: 'en' },
  decorators: [
    (Story, { globals }) => {
      document.documentElement.dataset.theme = globals.theme;
      document.documentElement.lang = globals.lang;
      return <Story />;
    },
  ],
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Tokens', ['Core Colours', 'Semantic Colours', 'Typography', 'Spacing', 'Border', 'Elevation', 'Gradient', 'All Tokens']],
      },
    },
  },
};

export default preview;
