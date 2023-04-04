import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
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
