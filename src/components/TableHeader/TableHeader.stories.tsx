import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TableHeader from './TableHeader';
import TableRow from '../TableRow/TableRow';
import TableCell from '../TableCell/TableCell';
import { TableHeaderProps } from './TableHeader.types';

export default {
  title: 'Components/Table/TableHeader',
  component: TableHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TableHeaderProps> = (args) => (
  <table>
    <TableHeader {...args}>
      <TableRow>
        <TableCell isHeader text="Header Column 1" />
        <TableCell isHeader text="Header Column 2" />
      </TableRow>
    </TableHeader>
  </table>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  backgroundColor: '#f4f4f4',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  backgroundColor: '#f4f4f4',
};
