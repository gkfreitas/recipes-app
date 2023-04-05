import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Profile from '../pages/Profile';
import renderWithRouter from '../renderWithRouter';

test('Testando elementos da pagina Profile', () => {
  const { history } = renderWithRouter(<Profile />);

  const emailText = screen.getByRole('heading', { level: 2 });
  expect(emailText).toBeInTheDocument();

  const doneButton = screen.getByRole('button', {
    name: /done recipes/i,
  });
  expect(doneButton).toBeInTheDocument();
  userEvent.click(doneButton);
  expect(history.location.pathname).toBe('/done-recipes');
  act(() => history.push('/profile'));

  const favoriteButton = screen.getByRole('button', {
    name: /favorite recipes/i,
  });
  expect(favoriteButton).toBeInTheDocument();
  userEvent.click(favoriteButton);
  expect(history.location.pathname).toBe('/favorite-recipes');
  act(() => history.push('/profile'));

  const logoutButton = screen.getByRole('button', {
    name: /logout/i,
  });
  expect(logoutButton).toBeInTheDocument();
  userEvent.click(logoutButton);
  expect(history.location.pathname).toBe('/');
});
