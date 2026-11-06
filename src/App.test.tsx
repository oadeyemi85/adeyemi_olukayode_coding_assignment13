import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the UI Garden library landing page', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /ui garden home/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /small pieces/i })).toBeInTheDocument();
});
