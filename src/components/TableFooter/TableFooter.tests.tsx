import React from 'react';
import { render, screen } from '@testing-library/react';
import TableFooter from './TableFooter';

describe('TableFooter Component', () => {
  test('should be visible', () => {
    render(
      <table>
        <TableFooter data-testid="table-footer">
          <tr>
            <td>Footer Content</td>
          </tr>
        </TableFooter>
      </table>
    );
    const footerElement = screen.getByTestId('table-footer');
    expect(footerElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(
      <table>
        <TableFooter data-testid="table-footer" disabled backgroundColor="#eaeded">
          <tr>
            <td>Footer Content</td>
          </tr>
        </TableFooter>
      </table>
    );
    const footerElement = screen.getByTestId('table-footer');

    expect(footerElement).toHaveStyle('background-color: #cccccc');
    expect(footerElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(
      <table>
        <TableFooter data-testid="table-footer" backgroundColor="#eaeded">
          <tr>
            <td>Footer Content</td>
          </tr>
        </TableFooter>
      </table>
    );
    const footerElement = screen.getByTestId('table-footer');

    expect(footerElement).toHaveStyle('background-color: #eaeded');
    expect(footerElement).not.toHaveStyle('cursor: not-allowed');
  });
});
