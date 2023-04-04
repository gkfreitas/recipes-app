import { useSearch } from '../context/SearchbarContext';
import Footer from '../components/Footer';

export default function Meals() {
  const { data, atualPath, filters } = useSearch();
  const maxRecipes = 12;
  const maxFilters = 5;
  const results = data?.slice(0, maxRecipes);
  const filtersToRender = filters?.slice(0, maxFilters);

  return (
    <div>
      { filtersToRender?.map((filter) => (
        <button data-testid={ `${filter}-category-filter` } key={ filter } type="button">
          {filter}
        </button>
      )) }
      {
        results?.map((meal, indexr) => {
          const type = atualPath === '/meals' ? 'Meal' : 'Drink';
          return (
            <div data-testid={ `${indexr}-recipe-card` } key={ meal[`id${type}`] }>
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
