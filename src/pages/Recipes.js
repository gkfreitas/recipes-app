import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSearch } from '../context/SearchbarContext';

export default function Meals() {
  const { data, atualPath, filters, setData, setResetTrigger } = useSearch();
  const [atualFilter, setAtualFilter] = useState('All');
  const maxRecipes = 12;
  const maxFilters = 5;
  const results = data?.slice(0, maxRecipes);
  const filtersToRender = filters?.slice(0, maxFilters);
  const type = atualPath === '/meals' ? 'Meal' : 'Drink';

  const handleFilter = async ({ target }) => {
    const { name } = target;
    console.log(name);
    if (name === 'All') return setResetTrigger((t) => !t);
    if (name !== atualFilter) setAtualFilter(name);
    if (name === atualFilter) {
      setAtualFilter('All');
      setResetTrigger((t) => !t);
    }
    const endpoint = atualPath === '/meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
    console.log(endpoint);
    const response = await fetch(endpoint);
    console.log(response);
    const respData = await response.json();
    setData(Object.values(respData)[0]);
  };

  return (
    <div>
      <div>
        { filtersToRender?.map((filter) => (
          <button
            name={ filter }
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
            name="All"
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
