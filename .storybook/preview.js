import '../build/css/tokens.css';
import '../build/css/tokens-dark.css';
import '../stories/tokens.css';

/** @type { import('@storybook/html').Preview } */
export default {
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
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (story, { globals }) => {
      document.documentElement.dataset.theme = globals.theme;
      return story();
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
