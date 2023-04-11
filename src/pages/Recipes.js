import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useSearch } from '../context/SearchbarContext';

export default function Meals() {
  const { data, atualPath, filters, setData, setResetTrigger } = useSearch();
  const [atualFilter, setAtualFilter] = useState('All');
  const maxRecipes = 12;
  const maxFilters = 5;
  const results = data?.slice(0, maxRecipes);
  const filtersToRender = filters?.slice(0, maxFilters);
  const type = atualPath === '/meals' ? 'Meal' : 'Drink';
  const type2 = atualPath === '/meals' ? 'Meals' : 'Drinks';

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

  return (
    <div>
      <Header name={ type2 } />
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
        {filtersToRender.length > 0
        && (
          <button
            onClick={ handleFilter }
            data-testid="All-category-filter"
            type="button"
          >
            All
          </button>
        )}
      </div>
      {
        results?.map((meal, indexr) => (
          <section key={ meal[`id${type}`] }>
            <Link
              to={ `${atualPath}/${meal[`id${type}`]}` }
              data-testid={ `${indexr}-recipe-card` }
            >
              <img
                width="420"
                height="400"
                data-testid={ `${indexr}-card-img` }
                src={ meal[`str${type}Thumb`] }
                alt={ meal[`str${type}`] }
              />
              <p data-testid={ `${indexr}-card-name` }>{meal[`str${type}`]}</p>
            </Link>
          </section>
        ))
      }
      <Footer />
    </div>
  );
}
