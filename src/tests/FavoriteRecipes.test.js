import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import renderWithRouter from '../renderWithRouter';
import SearchProvider from '../context/SearchbarContext';

describe('app de receitas', () => {
  test('Header', async () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LoginProvider>,
    );

    act(() => {
      history.push('/drinks/15997');
    });

    const heartBtnFavorite = await screen.findByTestId('favorite-btn');
    userEvent.click(heartBtnFavorite);
    act(() => {
      history.push('/favorite-recipes');
    });
    expect(screen.getByText(/Ordinary Drink/i)).toBeInTheDocument();
  });
});
