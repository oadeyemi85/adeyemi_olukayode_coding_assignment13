import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TableRow from './TableRow';
import TableCell from '../TableCell/TableCell';
import { TableRowProps } from './TableRow.types';

export default {
  title: 'Components/Table/TableRow',
  component: TableRow,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TableRowProps> = (args) => (
  <table>
    <tbody>
      <TableRow {...args}>
        <TableCell text="Cell 1" />
        <TableCell text="Cell 2" />
      </TableRow>
    </tbody>
  </table>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  backgroundColor: '#ffffff',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  backgroundColor: '#ffffff',
};
