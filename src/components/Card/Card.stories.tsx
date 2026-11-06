import React from 'react';
import { placeholderImage } from '../../placeholder';
import { Meta, StoryFn } from '@storybook/react';
import Card from './Card';
import { CardProps } from './Card.types';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    imageUrl: { control: 'text' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Sample Card Title',
  content: 'This card contains responsive layout and customizable properties.',
  imageUrl: placeholderImage,
  disabled: false,
  backgroundColor: '#ffffff',
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: 'Disabled Card Title',
  content: 'This card is rendered in a disabled state.',
  imageUrl: placeholderImage,
  disabled: true,
  backgroundColor: '#ffffff',
};
