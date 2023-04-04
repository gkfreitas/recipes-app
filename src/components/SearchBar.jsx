import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleSearch } from '../services/handleSearch';
import { useSearch } from '../context/SearchbarContext';

function SearchBar({ type }) {
  const { setData } = useSearch();
  const history = useHistory();
  const [searchValues, setSearchValues] = useState({
    searchInput: '',
    searchRadio: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        onChange={ handleChange }
      />

      <input
        type="radio"
        name="searchRadio"
        data-testid="ingredient-search-radio"
        value="ingredient"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient-search-radio">Ingrediente</label>

      <input
        type="radio"
        name="searchRadio"
        data-testid="name-search-radio"
        value="name"
        onChange={ handleChange }
      />
      <label htmlFor="name-search-radio">Nome</label>

      <input
        type="radio"
        name="searchRadio"
        data-testid="first-letter-search-radio"
        value="first-letter"
        onChange={ handleChange }
      />
      <label htmlFor="first-letter-search-radio">Primeira letra</label>

      <button
        onClick={ async () => setData(
          await handleSearch(searchValues, history, type, global),
        ) }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
