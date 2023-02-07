import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hey Teacher, we hear you/i);
  const priceEl = screen.getByText(/You keep asking/i)
  expect(linkElement).toBeInTheDocument();
  expect(priceEl).toBeInTheDocument();
  
});


