import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { useSearch } from '../context/SearchbarContext';

export default function FavoriteRecipes() {
  const history = useHistory();
  const { recipeID } = useContext(RecipeContext);
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();
  console.log(data[0]);
  const updateData = useCallback(async () => {
    if ((history.location.pathname).includes('/meals')) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
      const mealsData = await response.json();
      console.log(mealsData);
      setData(mealsData.meals);
    }
    if ((history.location.pathname).includes('/drinks')) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
      const drinkData = await response.json();
      setData(drinkData.drinks);
    }
  }, []);

  useEffect(() => {
    async function getList() {
      const results = await updateData();
      return results;
    }
    getList();
  }, [updateData]);
  return (
    <div>
      a
      {
        data?.map((meal, indexr) => {
          const type = atualPath === `/meals/${recipeID}` ? 'Meal' : 'Drink';
          return (
            <div />
          );
        })
      }
    </div>
  );
}
