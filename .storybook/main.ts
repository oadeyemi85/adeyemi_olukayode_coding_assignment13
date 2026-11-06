import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/preset-create-react-app', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-webpack5',
  // Forward slashes work on Windows, macOS, Linux and in Docker
  staticDirs: ['../public'],
};

export default config;
