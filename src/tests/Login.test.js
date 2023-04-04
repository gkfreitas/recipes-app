import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import renderWithRouter from '../renderWithRouter';
import SearchProvider from '../context/SearchbarContext';

describe('app de receitas', () => {
  test('Login', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LoginProvider>,
    );

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(inputEmail, 'trybe@gmail.com');
    userEvent.type(inputPassword, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
