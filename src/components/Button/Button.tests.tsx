import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('should be visible', () => {
    render(<Button text="Visible Button" />);
    const buttonElement = screen.getByText('Visible Button');
    expect(buttonElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(<Button text="Disabled Button" disabled backgroundColor="#007bff" />);
    const buttonElement = screen.getByText('Disabled Button');

    // Check background color for disabled state
    expect(buttonElement).toHaveStyle('background-color: #cccccc');
    expect(buttonElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(<Button text="Button" backgroundColor="#007bff" />);
    const buttonElement = screen.getByText('Button');

    // Check background color for disabled state
    expect(buttonElement).toHaveStyle('background-color: #007bff');
    expect(buttonElement).not.toHaveStyle('cursor: not-allowed');
  });
});
