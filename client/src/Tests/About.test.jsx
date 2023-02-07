import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../Components/About';

test('renders learn react link', () => {
  render(<About />);
  const linkElement = screen.getByText(/About Us/i);
  expect(linkElement).toBeInTheDocument(); 
});