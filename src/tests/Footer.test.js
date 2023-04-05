import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import SearchProvider from '../context/SearchbarContext';
import renderWithRouter from '../renderWithRouter';

test('Testando elementos do footer', () => {
  const { history } = renderWithRouter(
    <LoginProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </LoginProvider>,
  );
  act(() => {
    history.push('/drinks');
  });

  const { location: { pathname } } = history;
  // Verificando a rota
  expect(pathname).toBe('/drinks');

  // Verificando os 2 elementos
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
  // Verificando se os dois redirecionamentos estao corretos
  userEvent.click(links[2]);
  expect(history.location.pathname).toBe('/meals');

  const linksMeals = screen.getAllByRole('link');
  userEvent.click(linksMeals[1]);
  expect(history.location.pathname).toBe('/drinks');
});
