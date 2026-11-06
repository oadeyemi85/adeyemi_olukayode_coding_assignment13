import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TableFooter from './TableFooter';
import TableRow from '../TableRow/TableRow';
import TableCell from '../TableCell/TableCell';
import { TableFooterProps } from './TableFooter.types';

export default {
  title: 'Components/Table/TableFooter',
  component: TableFooter,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TableFooterProps> = (args) => (
  <table>
    <TableFooter {...args}>
      <TableRow>
        <TableCell text="Footer Content 1" />
        <TableCell text="Footer Content 2" />
      </TableRow>
    </TableFooter>
  </table>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  backgroundColor: '#eaeded',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  backgroundColor: '#eaeded',
};
