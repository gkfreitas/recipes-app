import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Recommendations.css';
import { useSearch } from '../context/SearchbarContext';

export default function Recommendations() {
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();
  const { id } = useParams();

  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const mealsData = await response.json();
      setData(mealsData.meals);
    }
    if (atualPath?.includes('/drinks')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const drinkData = await response.json();
      setData(drinkData.drinks);
    }
  }, []);

  const maxRecommendations = 6;
  const resultsData = data?.slice(0, maxRecommendations);

  useEffect(() => {
    async function getList() {
      const results = await updateData();
      return results;
    }
    getList();
  }, [updateData]);
  console.log(data);
  return (
    <div className="container">
      {
        resultsData?.map((meal, index) => {
          const type = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';
          return (
            <div className="item" key={ `${meal.idDrink}${index}` }>
              <div data-testid={ `${index}-recommendation-card` }>
                <div data-testid={ `${index}-recommendation-title` }>
                  {meal[`str${type}`]}
                </div>
              </div>
            </div>
          );
        })
      }

    </div>
  );
}
