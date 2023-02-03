import React from 'react';
import { render, screen } from '@testing-library/react';
import GPTA from '../Components/GPTA';

test('renders learn react link', () => {
  render(<GPTA />);
  const titleElement = screen.getByText(/Upload your file here and have it marked in seconds/i);
  expect(titleElement).toBeInTheDocument();
});

export {}
