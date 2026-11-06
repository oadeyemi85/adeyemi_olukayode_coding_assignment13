import React from 'react';
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

const testOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

describe('Dropdown Component', () => {
  test('should be visible', () => {
    render(<Dropdown options={testOptions} placeholder="Choose Item" />);
    const dropdownElement = screen.getByRole('combobox');
    expect(dropdownElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(<Dropdown options={testOptions} disabled backgroundColor="#ffffff" />);
    const dropdownElement = screen.getByRole('combobox');

    expect(dropdownElement).toHaveStyle('background-color: #cccccc');
    expect(dropdownElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(<Dropdown options={testOptions} backgroundColor="#ffffff" />);
    const dropdownElement = screen.getByRole('combobox');

    expect(dropdownElement).toHaveStyle('background-color: #ffffff');
    expect(dropdownElement).not.toHaveStyle('cursor: not-allowed');
  });
});
