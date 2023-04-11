import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import SearchProvider from '../context/SearchbarContext';
import renderWithRouter from '../renderWithRouter';

const imgTestId = '0-recipe-card';

describe('app de receitas', () => {
  test('detalhes de drinks', async () => {
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
    await screen.findByRole('button', { name: /All/i });

    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();

    expect(screen.getAllByRole('img')).toHaveLength(16);

    userEvent.click(btnAll);
    const img1 = await screen.findByTestId(imgTestId);
    expect(img1).toBeInTheDocument();

    userEvent.click(img1);
    expect(history.location.pathname).toBe('/drinks/15997');
    // expect(await screen.findByText('img')).toHaveProperty('alt', 'GG');
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /Ingredients:/i })).toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(await screen.findByTestId('instructions')).toBeInTheDocument();
  });
});
