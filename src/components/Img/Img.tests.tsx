import React from 'react';
import { placeholderImage } from '../../placeholder';
import { render, screen } from '@testing-library/react';
import Img from './Img';

describe('Img Component', () => {
  test('should be visible', () => {
    render(<Img src={placeholderImage} alt="Test Image" />);
    const imageElement = screen.getByAltText('Test Image');
    expect(imageElement).toBeVisible();
  });

  test('should change background color when disabled state is active', () => {
    render(<Img src={placeholderImage} alt="Test Image" disabled backgroundColor="#ff0000" />);
    const containerElement = screen.getByAltText('Test Image').parentElement;

    expect(containerElement).toHaveStyle('background-color: #cccccc');
    expect(containerElement).toHaveStyle('cursor: not-allowed');
  });

  test('should keep the chosen background colour and a normal cursor when enabled', () => {
    render(<Img src={placeholderImage} alt="Test Image" backgroundColor="#ff0000" />);
    const containerElement = screen.getByAltText('Test Image').parentElement;

    expect(containerElement).toHaveStyle('background-color: #ff0000');
    expect(containerElement).not.toHaveStyle('cursor: not-allowed');
  });
});
