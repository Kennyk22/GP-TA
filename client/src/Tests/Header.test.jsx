import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getByTestId('About-Header');
  const priceEl = screen.getByTestId('Price-Header');
  expect(titleElement).toBeInTheDocument();
  expect(priceEl).toBeInTheDocument();
});

export {}