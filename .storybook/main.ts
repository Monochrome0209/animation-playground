import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // addons: [
  //   '@storybook/addon-essentials',
  //   '@storybook/addon-controls',
  //   '@storybook/addon-backgrounds',
  // ],
};

export default config;