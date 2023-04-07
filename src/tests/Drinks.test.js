import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import SearchProvider from '../context/SearchbarContext';
import renderWithRouter from '../renderWithRouter';

const imgTestId = '0-recipe-card';

describe('app de receitas', () => {
  test('Inputs dos tipos de drinks', async () => {
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
    await screen.findByText('GG');
    await screen.findByRole('button', { name: /Ordinary Drink/i });

    const btnOrdinaryDrink = screen.getByRole('button', { name: /Ordinary Drink/i });
    expect(btnOrdinaryDrink).toBeInTheDocument();
    const btnCocktail = screen.getByRole('button', { name: /Cocktail/i });
    expect(btnCocktail).toBeInTheDocument();
    const btnShake = screen.getByRole('button', { name: /Shake/i });
    expect(btnShake).toBeInTheDocument();
    const btnOther = screen.getByRole('button', { name: /Other/i });
    expect(btnOther).toBeInTheDocument();
    const btnCocoa = screen.getByRole('button', { name: /Cocoa/i });
    expect(btnCocoa).toBeInTheDocument();
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(16);
    await act(async () => {
      userEvent.click(btnOrdinaryDrink);
      const img1 = await screen.findByTestId(imgTestId);
      expect(img1).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(btnAll);
      const img2 = await screen.findByTestId(imgTestId);
      expect(img2).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(imgTestId));

    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
