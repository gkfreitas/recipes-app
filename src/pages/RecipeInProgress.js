import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Recommendations.css';
import FavoriteBtn from '../components/FavoriteBtn';
import Recommendations from '../components/Recommendations';
import ShareButton from '../components/ShareButton';
import StartButton from '../components/StartButton';
import { useSearch } from '../context/SearchbarContext';

export default function RecipeInProgress() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();
  const [isChecked, setChecked] = useState([]);
  const type = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';

  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const mealsData = await response.json();
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

  const objectsData = data[0] && Object.keys(data[0]);
  const ingredients = objectsData?.filter((e) => e.includes('strIngredient'));
  const measures = objectsData?.filter((e) => e.includes('strMeasure'));
  const linkYoutube = data[0] && data[0].strYoutube;
  const endpoint = linkYoutube?.split('?v=');

  const verifyChecked = (item) => {
    const verify = isChecked.includes(item) ? 'checked-item' : 'not-checked';
    return verify;
  };

  const typeLocal = atualPath === `/meals/${id}` ? 'meals' : 'drinks';
  const objIngredients = objectsData?.filter((e) => e.includes('strIngredient'));
  const ingredientsNew = data?.map((r) => {
    const newArray = objIngredients.map((e) => {
      const verify = r[e] !== null ? r[e] : '';
      return verify;
    });
    return newArray.filter((e) => e !== '');
  });
  const localStarted = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { drinks: {}, meals: {} };

  function startedRecipe() {
    localStarted[typeLocal] = {
      [id]: ingredientsNew[0],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStarted));
  }
  const checkboxVerify = ({ target }) => {
    let updatedList = [...isChecked];
    if (target.checked) {
      updatedList = [...isChecked, target.value];
    } else {
      updatedList.splice(isChecked.indexOf(target.value), 1);
    }
    setChecked(updatedList);
    startedRecipe();
  };

  return (
    <div>
      {data?.map((recipe) => (
        <div key={ id }>
          <FavoriteBtn recipe={ recipe } />
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
          {ingredients.map((e, index) => {
            const label = (
              recipe[e] !== '' && recipe[e] !== null && recipe[measures[index]] !== ''
              && recipe[measures[index]] !== null
              && (
                <label
                  key={ e }
                  data-testid={ `${index}-ingredient-step` }
                  className={ verifyChecked(e) }
                >
                  `
                  {recipe[e]}
                  {' '}

                  {recipe[measures[index]]}
                  `
                  <input value={ e } type="checkbox" onChange={ checkboxVerify } />
                </label>)
            );
            return label;
          })}
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
      <Recommendations dataRecipe={ data } />
      <StartButton dataRecipe={ data } />
      <ShareButton />
    </div>
  );
}
