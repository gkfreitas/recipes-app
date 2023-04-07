import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Recommendations.css';
import { useSearch } from '../context/SearchbarContext';
import blackHeathIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeathIcon from '../images/whiteHeartIcon.svg';

export default function Recommendations({ dataRecipe }) {
  const [data, setData] = useState([]);
  const [linkCopy, setLinkCopy] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const { atualPath } = useSearch();
  const { id } = useParams();
  console.log(window.location.href);
  const type = atualPath === `/meals/${id}` ? 'Drink' : 'Meal';
  const type2 = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';
  const typeLocal = atualPath === `/meals/${id}` ? 'meals' : 'drinks';
  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const mealsData = await response.json();
      setData(mealsData.drinks);
    }
    if (atualPath?.includes('/drinks')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const drinkData = await response.json();
      setData(drinkData.meals);
    }
  }, []);
  const localRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const localIds = localRecipes.map((e) => e.id);
  const recipeIsDone = localIds.some((e) => e === id);

  const recipesLoaded = dataRecipe.length === 1;

  const alcoholicOrNot = type2 === 'Drink'
   && recipesLoaded ? dataRecipe[0].strAlcoholic : '';
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const dataRecipes = recipesLoaded && [{
    id: dataRecipe[0][`id${type2}`],
    type,
    nationality: dataRecipe[0].strArea,
    category: dataRecipe[0].strCategory,
    alcoholicOrNot,
    name: dataRecipe[0][`str${type2}`],
    image: dataRecipe[0][`str${type2}Thumb`],
    doneDate: dataRecipe[0].dateModified,
    tags: dataRecipe[0].strTags,
  }];

  const favoriteString = JSON.stringify(localFavorites.push(dataRecipes));

  const maxRecommendations = 6;
  const resultsData = data?.slice(0, maxRecommendations);
  const objectsData = dataRecipe[0] && Object.keys(dataRecipe[0]);
  const objIngredients = objectsData?.filter((e) => e.includes('strIngredient'));
  const ingredients = dataRecipe?.map((r) => {
    const newArray = objIngredients.map((e) => {
      const verify = r[e] !== null ? r[e] : '';
      return verify;
    });
    return newArray.filter((e) => e !== '');
  });
  const localStarted = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { drinks: {}, meals: {} };
  console.log(typeLocal);
  const verifyRecipe = Object.keys(localStarted[typeLocal]);
  console.log(verifyRecipe);
  function startedRecipe() {
    localStarted[typeLocal] = {
      [id]: ingredients[0],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStarted));
  }

  const handleClick = () => {
    clipboardCopy(window.location.href);
    setLinkCopy(true);
  };

  const localSave = () => {
    localStorage.setItem('favoriteRecipes', favoriteString);
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  useEffect(() => {
    async function getList() {
      const results = await updateData();
      return results;
    }
    getList();
    const verifyFavorite = localFavorites?.some((e) => e.id === id);
    setFavorite(!verifyFavorite);
  }, [updateData]);

  return (
    <>
      <div className="container">
        {
          resultsData?.map((meal, index) => (
            <div className="item" key={ `${meal.idDrink}${index}` }>
              <div data-testid={ `${index}-recommendation-card` }>
                <img
                  width="150px"
                  height="100px"
                  src={ meal[`str${type}Thumb`] }
                  alt={ meal[`str${type}`] }
                />
                <div data-testid={ `${index}-recommendation-title` }>
                  {meal[`str${type}`]}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {!recipeIsDone
      && (
        <Link to={ `${atualPath}/in-progress` }>
          <button
            className="button-start"
            data-testid="start-recipe-btn"
            onClick={ () => startedRecipe() }
          >
            Start Recipe
          </button>
        </Link>
      )}
      {
        verifyRecipe[0] === id
        && (
          <Link to={ `${atualPath}/in-progress` }>
            <button
              className="button-start"
              data-testid="start-recipe-btn"
            >
              Continue Recipe
            </button>
          </Link>
        )
      }
      <button
        data-testid="share-btn"
        className="share-btn"
        onClick={ () => handleClick() }
      >
        <img alt="Share button" src={ shareIcon } />
      </button>
      {linkCopy && <p>Link copied!</p>}
      <button
        aria-label="save"
        type="button"
        onClick={ () => localSave() }
        src={ isFavorite ? whiteHeathIcon : blackHeathIcon }
        data-testid="favorite-btn"
        className="favorite-btn"
      />
    </>
  );
}

Recommendations.propTypes = {
  dataRecipe: PropTypes.arrayOf(PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    dateModified: PropTypes.string,
    strTags: PropTypes.string,
  })).isRequired,
};
