import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RadioButton from './RadioButton';
import { RadioButtonProps } from './RadioButton.types';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<RadioButtonProps> = (args) => <RadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Radio Button',
  checked: false,
  disabled: false,
  backgroundColor: '#f8f9fa',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Radio Button',
  checked: false,
  disabled: true,
  backgroundColor: '#f8f9fa',
};
