import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TableCell from './TableCell';
import { TableCellProps } from './TableCell.types';

export default {
  title: 'Components/Table/TableCell',
  component: TableCell,
  argTypes: {
    text: { control: 'text' },
    isHeader: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<TableCellProps> = (args) => (
  <table>
    <tbody>
      <tr>
        <TableCell {...args} />
      </tr>
    </tbody>
  </table>
);

export const Default = Template.bind({});
Default.args = {
  text: 'Sample Cell Content',
  isHeader: false,
  disabled: false,
  backgroundColor: '#ffffff',
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled Cell Content',
  isHeader: false,
  disabled: true,
  backgroundColor: '#ffffff',
};
