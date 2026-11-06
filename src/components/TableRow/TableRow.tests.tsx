import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from './TableRow';

describe('TableRow Component', () => {
  test('should be visible', () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="table-row">
            <td>Row Content</td>
          </TableRow>
        </tbody>
      </table>
    );
    const rowElement = screen.getByTestId('table-row');
    expect(rowElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="table-row" disabled backgroundColor="#ffffff">
            <td>Row Content</td>
          </TableRow>
        </tbody>
      </table>
    );
    const rowElement = screen.getByTestId('table-row');

    expect(rowElement).toHaveStyle('background-color: #cccccc');
    expect(rowElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="table-row" backgroundColor="#ffffff">
            <td>Row Content</td>
          </TableRow>
        </tbody>
      </table>
    );
    const rowElement = screen.getByTestId('table-row');

    expect(rowElement).toHaveStyle('background-color: #ffffff');
    expect(rowElement).not.toHaveStyle('cursor: not-allowed');
  });
});
