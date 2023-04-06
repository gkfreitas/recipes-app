import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import SearchProvider from '../context/SearchbarContext';
import renderWithRouter from '../renderWithRouter';

const imgTestId = '0-recipe-card';

describe('app de receitas', () => {
  beforeEach(() => {
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
  });

  test('Inputs dos tipos de meals', async () => {
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
    const img1 = await screen.findByTestId(imgTestId);
    expect(img1).toBeInTheDocument();

    userEvent.click(btnAll);
    const img2 = await screen.findByTestId(imgTestId);
    expect(img2).toBeInTheDocument();

    userEvent.click(img2);
    await waitFor(() => expect(screen.findByText(/Corba/i)).toBeInTheDocument());
  });
});
