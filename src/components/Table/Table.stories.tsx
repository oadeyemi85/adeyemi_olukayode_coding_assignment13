import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Table from './Table';
import TableHeader from '../TableHeader/TableHeader';
import TableRow from '../TableRow/TableRow';
import TableCell from '../TableCell/TableCell';
import TableFooter from '../TableFooter/TableFooter';
import { TableProps } from './Table.types';

export default {
  title: 'Components/Table/Table',
  component: Table,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    borderColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TableProps> = (args) => (
  <Table {...args}>
    <TableHeader>
      <TableRow>
        <TableCell isHeader text="Header 1" />
        <TableCell isHeader text="Header 2" />
      </TableRow>
    </TableHeader>
    <tbody>
      <TableRow>
        <TableCell text="Row 1, Cell 1" />
        <TableCell text="Row 1, Cell 2" />
      </TableRow>
    </tbody>
    <TableFooter>
      <TableRow>
        <TableCell text="Footer 1" />
        <TableCell text="Footer 2" />
      </TableRow>
    </TableFooter>
  </Table>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  backgroundColor: '#ffffff',
  borderColor: '#dddddd',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  backgroundColor: '#ffffff',
  borderColor: '#dddddd',
};
