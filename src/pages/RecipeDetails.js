import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recommendations from '../components/Recommendations';
import { useSearch } from '../context/SearchbarContext';

export default function FavoriteRecipes() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();

  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const mealsData = await response.json();
      console.log(mealsData);
      setData(mealsData.meals);
    }
    if (atualPath?.includes('/drinks')) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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

  const objectsData = data[0] && Object.keys(data[0]);
  const ingredients = objectsData?.filter((e) => e.includes('strIngredient'));
  const measures = objectsData?.filter((e) => e.includes('strMeasure'));
  const linkYoutube = data[0] && data[0].strYoutube;
  const endpoint = linkYoutube?.split('?v=');

  return (
    <div>
      {
        data?.map((meal) => {
          const type = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';
          return (
            <div key={ id }>
              <img
                data-testid="recipe-photo"
                src={ meal[`str${type}Thumb`] }
                alt={ meal[`str${type}`] }
              />
              <p data-testid="recipe-title">{meal[`str${type}`]}</p>
              <p data-testid="recipe-category">
                {`${meal.strCategory} ${meal.strAlcoholic}`}
              </p>
              <h3>Ingredients:</h3>
              {ingredients.map((e, index) => (
                <p key={ e } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${meal[e] !== null ? meal[e] : ''} 
                  ${meal[measures[index]] !== null ? meal[measures[index]] : ''}`}
                </p>
              ))}
              <h3>Instructions:</h3>
              <p data-testid="instructions">{meal.strInstructions}</p>
              <iframe
                data-testid="video"
                src={ data[0].strYoutube && `https://www.youtube.com/embed/${endpoint[1]}` }
                height="500px"
                width="600px"
                title="Video"
              />
            </div>
          );
        })
      }
      Recommendations:
      <Recommendations />
    </div>
  );
}
