import React from 'react';
import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import LoginProvider from '../context/LoginContext';
import renderWithRouter from '../renderWithRouter';
import SearchProvider from '../context/SearchbarContext';

const searchInput = 'search-input';
const ingredientRadio = 'ingredient-search-radio';
const nameRadio = 'name-search-radio';
const firstLetterRadio = 'first-letter-search-radio';
const execBtn = 'exec-search-btn';
const searchTopBtn = 'search-top-btn';

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

    const btnSearch = screen.getByTestId(searchTopBtn);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);
  });

  test('Header', () => {
    const inputBusca = screen.getByTestId(searchInput);
    const ingrediente = screen.getByTestId(ingredientRadio);
    const nome = screen.getByTestId(nameRadio);
    const primeiraLetra = screen.getByTestId(firstLetterRadio);
    const btnBuscar = screen.getByTestId(execBtn);
    expect(inputBusca).toBeInTheDocument();
    expect(ingrediente).toBeInTheDocument();
    expect(nome).toBeInTheDocument();
    expect(primeiraLetra).toBeInTheDocument();
    expect(btnBuscar).toBeInTheDocument();
  });

  test('Busca por nome', async () => {
    const inputBusca = screen.getByTestId(searchInput);
    const nome = screen.getByTestId(nameRadio);
    const btnBuscar = screen.getByTestId(execBtn);
    userEvent.type(inputBusca, 'bean');
    userEvent.click(nome);
    userEvent.click(btnBuscar);
    await waitFor(() => expect(screen.getByText(/Kidney Bean Curry/i)).toBeInTheDocument());
  });

  test('Busca pela primeira letra', async () => {
    const inputBusca = screen.getByTestId(searchInput);
    const primeiraLetra = screen.getByTestId(firstLetterRadio);
    const btnBuscar = screen.getByTestId(execBtn);
    userEvent.type(inputBusca, 'a');
    userEvent.click(primeiraLetra);
    userEvent.click(btnBuscar);
    await waitFor(() => expect(screen.getByText(/Apple Frangipan Tart/i)).toBeInTheDocument());
  });

  test('Busca pelo ingrediente', async () => {
    const inputBusca = screen.getByTestId(searchInput);
    const ingrediente = screen.getByTestId(ingredientRadio);
    const btnBuscar = screen.getByTestId(execBtn);
    userEvent.type(inputBusca, 'milk');
    userEvent.click(ingrediente);
    userEvent.click(btnBuscar);
    await waitFor(() => expect(screen.getByText(/Apam balik/i)).toBeInTheDocument());
  });

  test('Alert', async () => {
    window.alert = jest.fn();
    const inputBusca = screen.getByTestId(searchInput);
    const nome = screen.getByTestId(nameRadio);
    const btnBuscar = screen.getByTestId(execBtn);
    userEvent.type(inputBusca, '3');
    userEvent.click(nome);
    userEvent.click(btnBuscar);
    await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
  });

  test('search Icon', async () => {
    const btnSearch = screen.getByTestId(searchTopBtn);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    userEvent.click(btnSearch);

    const inputSearchBar = screen.getByTestId(searchInput);
    userEvent.click(btnSearch);
    expect(inputSearchBar).not.toBeInTheDocument();
  });
});
