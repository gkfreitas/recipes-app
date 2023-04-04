import React from 'react';
import { useSearch } from '../context/SearchbarContext';

export default function Meals() {
  const { data } = useSearch();
  const index = 12;
  const results = data?.slice(0, index);
  return (
    <div>
      {
        results?.map((meal, indexr) => (
          <div data-testid={ `${indexr}-recipe-card` } key={ meal.idMeal }>
            <img
              data-testid={ `${indexr}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <p data-testid={ `${indexr}-card-name` }>{meal.strMeal}</p>
          </div>
        ))
      }
    </div>
  );
}
