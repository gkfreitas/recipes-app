import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recommendations from '../components/Recommendations';
import { useSearch } from '../context/SearchbarContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteRecipes() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.find((e) => e.id === id));
  const type = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';

  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const mealsData = await response.json();
      console.log(mealsData);
      setData(mealsData.meals);
    }
    if (atualPath?.includes('/drinks')) {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
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

  const handleFavorite = (recipe) => {
    const newFavoriteRecipes = isFavorite
      ? favoriteRecipes.filter((e) => e.id !== id) : [
        ...favoriteRecipes,
        {
          id,
          type,
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe[`str${type}`],
          image: recipe[`str${type}Thumb`],
        },
      ];
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newFavoriteRecipes),
    );
    setIsFavorite(!isFavorite);
  };

  const objectsData = data[0] && Object.keys(data[0]);
  const ingredients = objectsData?.filter((e) => e.includes('strIngredient'));
  const measures = objectsData?.filter((e) => e.includes('strMeasure'));
  const linkYoutube = data[0] && data[0].strYoutube;
  const endpoint = linkYoutube?.split('?v=');

  return (
    <div>
      {data?.map((recipe) => (
        <div key={ id }>
          <button
            onClick={ () => handleFavorite(recipe) }
          >
            <img
              data-testid="favorite-btn"
              alt="heart"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
          <img
            data-testid="recipe-photo"
            src={ recipe[`str${type}Thumb`] }
            alt={ recipe[`str${type}`] }
          />
          <p data-testid="recipe-title">{recipe[`str${type}`]}</p>
          <p data-testid="recipe-category">
            {`${recipe.strCategory} ${recipe.strAlcoholic}`}
          </p>
          <h3>Ingredients:</h3>
          {ingredients.map((e, index) => (
            <p key={ e } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${recipe[e] !== null ? recipe[e] : ''} 
                  ${
            recipe[measures[index]] !== null ? recipe[measures[index]] : ''
            }`}
            </p>
          ))}
          <h3>Instructions:</h3>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <iframe
            data-testid="video"
            src={
              data[0].strYoutube
                && `https://www.youtube.com/embed/${endpoint[1]}`
            }
            height="500px"
            width="600px"
            title="Video"
          />
        </div>
      ))}
      Recommendations:
      <Recommendations />
    </div>
  );
}
