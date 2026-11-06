import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown from './Dropdown';
import { DropdownProps } from './Dropdown.types';

const sampleOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    placeholder: { control: 'text' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: sampleOptions,
  placeholder: 'Select an Option',
  disabled: false,
  backgroundColor: '#ffffff',
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: sampleOptions,
  placeholder: 'Select an Option',
  disabled: true,
  backgroundColor: '#ffffff',
};
