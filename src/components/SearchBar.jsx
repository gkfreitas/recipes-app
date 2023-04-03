import PropTypes from 'prop-types';

function SearchBar({ type }) {
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

  const handleSearch = () => {
    const { searchInput, searchRadio } = searchValues;
    const searchEnpoints = type === 'meal'
      ? {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
        'first-letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
      } : {
        ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`,
        name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`,
        'first-letter': `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`,
      };
    if (searchRadio === 'first-letter' && searchInput.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const endpoint = searchEnpoints[searchRadio];
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        name="search-input"
        onChange={ handleChange }
      />

      <input
        type="radio"
        name="search-radio"
        data-testid="ingredient-search-radio"
        value="ingredient"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient-search-radio">Ingrediente</label>

      <input
        type="radio"
        name="search-radio"
        data-testid="name-search-radio"
        value="name"
        onChange={ handleChange }
      />
      <label htmlFor="name-search-radio">Nome</label>

      <input
        type="radio"
        name="search-radio"
        data-testid="first-letter-search-radio"
        value="first-letter"
        onChange={ handleChange }
      />
      <label htmlFor="first-letter-search-radio">Primeira letra</label>

      <button
        onClick={ handleSearch }
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
