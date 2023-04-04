import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      history.push('/meals');
    });

    const linkToProfile = screen.getByTestId('profile-top-btn');
    expect(linkToProfile).toBeInTheDocument();
    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();

    userEvent.click(btnSearch);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    userEvent.click(linkToProfile);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});
