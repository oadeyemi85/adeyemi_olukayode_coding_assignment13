import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroImage from './HeroImage';

describe('HeroImage Component', () => {
  test('should be visible', () => {
    render(<HeroImage title="Visible Hero Banner" />);
    const heroElement = screen.getByText('Visible Hero Banner');
    expect(heroElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(<HeroImage title="Disabled Hero Banner" disabled backgroundColor="#ff0000" />);
    const heroContainer = screen.getByText('Disabled Hero Banner').parentElement;

    expect(heroContainer).toHaveStyle('background-color: #cccccc');
    expect(heroContainer).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(<HeroImage title="Hero Banner" backgroundColor="#ff0000" />);
    const heroContainer = screen.getByText('Hero Banner').parentElement;

    expect(heroContainer).toHaveStyle('background-color: #ff0000');
    expect(heroContainer).not.toHaveStyle('cursor: not-allowed');
  });
});
