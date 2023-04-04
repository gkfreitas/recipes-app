import React from 'react';
import { useSearch } from '../context/SearchbarContext';
import Footer from '../components/Footer';

export default function Drinks() {
  const { data } = useSearch();
  const index = 12;
  const results = data?.slice(0, index);
  return (
    <div>
      {
        results?.map((drink, indexr) => (
          <div data-testid={ `${indexr}-recipe-card` } key={ drink.idDrink }>
            <img
              data-testid={ `${indexr}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <p data-testid={ `${indexr}-card-name` }>{drink.strDrink}</p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
