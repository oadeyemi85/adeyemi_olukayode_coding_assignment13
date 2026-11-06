import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

describe('Table Component', () => {
  test('should be visible', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Table Data</td>
          </tr>
        </tbody>
      </Table>
    );
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(
      <Table disabled backgroundColor="#ffffff">
        <tbody>
          <tr>
            <td>Table Data</td>
          </tr>
        </tbody>
      </Table>
    );
    const tableElement = screen.getByRole('table');

    expect(tableElement).toHaveStyle('background-color: #cccccc');
    expect(tableElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(
      <Table backgroundColor="#ffffff">
        <tbody>
          <tr>
            <td>Table Data</td>
          </tr>
        </tbody>
      </Table>
    );
    const tableElement = screen.getByRole('table');

    expect(tableElement).toHaveStyle('background-color: #ffffff');
    expect(tableElement).not.toHaveStyle('cursor: not-allowed');
  });
});
