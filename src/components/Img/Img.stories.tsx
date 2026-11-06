import React from 'react';
import { placeholderImage } from '../../placeholder';
import { Meta, StoryFn } from '@storybook/react';
import Img from './Img';
import { ImgProps } from './Img.types';

export default {
  title: 'Components/Img',
  component: Img,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<ImgProps> = (args) => <Img {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: placeholderImage,
  alt: 'Default Placeholder Image',
  disabled: false,
  backgroundColor: 'transparent',
};

export const Disabled = Template.bind({});
Disabled.args = {
  src: placeholderImage,
  alt: 'Disabled Image',
  disabled: true,
  backgroundColor: '#cccccc',
};
