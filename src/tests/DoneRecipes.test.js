import React from 'react';
import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import renderWithRouter from '../renderWithRouter';
import SearchProvider from '../context/SearchbarContext';

describe('app de receitas', () => {
  test('Header', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LoginProvider>,
    );

    act(() => {
      history.push('/done-recipes');
    });

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
