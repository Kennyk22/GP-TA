import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../Components/LoginPage';
import { useAuth0 } from '@auth0/auth0-react'
import {loginWithRedirect} from '@auth0/auth0-react'


test('renders elements in page', () => {
  render(<LoginPage />);
  const loginButton = screen.getByText('Log in / Register');
  expect(loginButton).toBeInTheDocument();
})

test('renders sample image', () => {
  render(<LoginPage />);
  const image = screen.getByTestId('img');
  expect(image).toBeInTheDocument()
})


test('renders steps', () => {
  render(<LoginPage />)
  const step1 = screen.getByText("Upload you students' work by Docx, Image, or raw text to our AI assistant.")
  const step2 = screen.getByText("First we give you highlighted sections to let you know where the errors are")
  expect(step1).toBeInTheDocument()
  expect(step2).toBeInTheDocument()
})




