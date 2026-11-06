import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Text from './Text';
import { TextProps } from './Text.types';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    text: { control: 'text' },
    size: { control: 'text' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TextProps> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'This is standard body text.',
  disabled: false,
  size: '16px',
  backgroundColor: '#f8f9fa',
  color: '#212529',
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'This is disabled text.',
  disabled: true,
  size: '16px',
  backgroundColor: '#f8f9fa',
  color: '#212529',
};
