import React from 'react';
import { placeholderImage } from '../../placeholder';
import { Meta, StoryFn } from '@storybook/react';
import HeroImage from './HeroImage';
import { HeroImageProps } from './HeroImage.types';

export default {
  title: 'Components/HeroImage',
  component: HeroImage,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    src: { control: 'text' },
    height: { control: 'text' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<HeroImageProps> = (args) => <HeroImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to Our Component Library',
  subtitle: 'Responsive, customizable, and accessible React UI toolkit',
  src: placeholderImage,
  disabled: false,
  backgroundColor: '#222222',
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: 'Disabled Hero Banner',
  subtitle: 'This hero section is currently in a disabled state',
  src: placeholderImage,
  disabled: true,
  backgroundColor: '#cccccc',
};
