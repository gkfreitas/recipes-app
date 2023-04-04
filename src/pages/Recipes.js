import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSearch } from '../context/SearchbarContext';
import Footer from '../components/Footer';

export default function Meals() {
  const { data, atualPath, filters, setData, setResetTrigger } = useSearch();
  const [atualFilter, setAtualFilter] = useState('All');
  const maxRecipes = 12;
  const maxFilters = 5;
  const results = data?.slice(0, maxRecipes);
  const filtersToRender = filters?.slice(0, maxFilters);

  const handleFilter = async ({ target }) => {
    const { innerText } = target;
    if (innerText === 'All') return setResetTrigger((t) => !t);
    if (innerText !== atualFilter) setAtualFilter(innerText);
    if (innerText === atualFilter) {
      setAtualFilter('All');
      setResetTrigger((t) => !t);
    }
    const endpoint = atualPath === '/meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${innerText}`;
    const response = await fetch(endpoint);
    const respData = await response.json();
    setData(Object.values(respData)[0]);
  };

  const history = useHistory();

  return (
    <div>
      <div>
        { filtersToRender?.map((filter) => (
          <button
            onClick={ handleFilter }
            data-testid={ `${filter}-category-filter` }
            key={ filter }
            type="button"
          >
            {filter}
          </button>
        )) }
        <button
          onClick={ handleFilter }
          data-testid="All-category-filter"
          type="button"
        >
          All
        </button>
      </div>
      {
        results?.map((meal, indexr) => {
          const type = atualPath === '/meals' ? 'Meal' : 'Drink';
          return (
            <div
              aria-hidden="true"
              onClick={ () => {
                if (type === 'Meal') return history.push(`/meals/${meal[`id${type}`]}`);
                history.push(`/drinks/${meal[`id${type}`]}`);
              } }
              data-testid={ `${indexr}-recipe-card` }
              key={ meal[`id${type}`] }
            >
              <img
                data-testid={ `${indexr}-card-img` }
                src={ meal[`str${type}Thumb`] }
                alt={ meal[`str${type}`] }
              />
              <p data-testid={ `${indexr}-card-name` }>{meal[`str${type}`]}</p>
            </div>
          );
        })
      }
      <Footer />
    </div>
  );
}
