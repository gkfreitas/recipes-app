import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import SearchProvider from '../context/SearchbarContext';
import renderWithRouter from '../renderWithRouter';

describe('app de receitas', () => {
  test('Inputs dos tipos de meals', async () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LoginProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    await screen.findByText('Corba');
    await screen.findByRole('button', { name: /Beef/i });

    const btnBeef = screen.getByRole('button', { name: /Beef/i });
    expect(btnBeef).toBeInTheDocument();
    const btnBreakfast = screen.getByRole('button', { name: /Breakfast/i });
    expect(btnBreakfast).toBeInTheDocument();
    const btnChicken = screen.getByRole('button', { name: /Chicken/i });
    expect(btnChicken).toBeInTheDocument();
    const btnDessert = screen.getByRole('button', { name: /Dessert/i });
    expect(btnDessert).toBeInTheDocument();
    const btnGoat = screen.getByRole('button', { name: /Goat/i });
    expect(btnGoat).toBeInTheDocument();
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(16);

    userEvent.click(btnBeef);

    // screen.debug();
    await waitFor(() => {
      const recipes1 = screen.getAllByTestId(/card-name/i);
      expect(recipes1[0].innerHTML).toBe('Beef and Mustard Pie');
    }, { timeout: 3000 });

    userEvent.click(btnBeef);
    await waitFor(() => {
      const recipes1 = screen.getAllByTestId(/card-name/i);
      expect(recipes1[0].innerHTML).toBe('Corba');
    }, { timeout: 3000 });

    userEvent.click(btnBeef);
    await waitFor(() => {
      const recipes1 = screen.getAllByTestId(/card-name/i);
      expect(recipes1[0].innerHTML).toBe('Beef and Mustard Pie');
    }, { timeout: 3000 });

    userEvent.click(btnAll);
    await waitFor(() => {
      const recipes1 = screen.getAllByTestId(/card-name/i);
      expect(recipes1[0].innerHTML).toBe('Corba');
    }, { timeout: 3000 });

    const recipes1 = screen.getAllByTestId(/card-name/i);
    userEvent.click(recipes1[0]);
    expect(history.location.pathname).toBe('/meals/52977');
    expect(await screen.findByText('Corba')).toBeInTheDocument();
  });
});
