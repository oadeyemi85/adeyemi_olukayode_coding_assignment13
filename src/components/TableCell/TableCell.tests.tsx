import React from 'react';
import { render, screen } from '@testing-library/react';
import TableCell from './TableCell';

describe('TableCell Component', () => {
  test('should be visible', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell text="Visible Cell" />
          </tr>
        </tbody>
      </table>
    );
    const cellElement = screen.getByText('Visible Cell');
    expect(cellElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell text="Disabled Cell" disabled backgroundColor="#ffffff" />
          </tr>
        </tbody>
      </table>
    );
    const cellElement = screen.getByText('Disabled Cell');

    expect(cellElement).toHaveStyle('background-color: #cccccc');
    expect(cellElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell text="Cell" backgroundColor="#ffffff" />
          </tr>
        </tbody>
      </table>
    );
    const cellElement = screen.getByText('Cell');

    expect(cellElement).toHaveStyle('background-color: #ffffff');
    expect(cellElement).not.toHaveStyle('cursor: not-allowed');
  });
});
