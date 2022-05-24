import { render, screen } from '@testing-library/react';
import Dashboard from './containers/Dashboard';

test('renders All tab', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/All/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Filter section', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Filter/i);
  expect(linkElement).toBeInTheDocument();
});
