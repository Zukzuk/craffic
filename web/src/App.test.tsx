import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main wireframe', () => {
  render(<App />);
  const elements = screen.getByText(/Live from Space in the House through the Roof/i);
  expect(elements).toBeInTheDocument();
});
