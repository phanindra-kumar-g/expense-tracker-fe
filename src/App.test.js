import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Header successfullly', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
