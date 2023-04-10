/* eslint-disable complexity */
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import '../Recommendations.css';
import { useSearch } from '../context/SearchbarContext';

export default function StartButton({ dataRecipe }) {
  const { atualPath } = useSearch();
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const verifyInProgress = pathname.includes('in-progress');

  const localRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const localIds = localRecipes.map((e) => e.id);
  const recipeIsDone = localIds.some((e) => e === id);
  const typeLocal = atualPath === `/meals/${id}` ? 'meals' : 'drinks';
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
  const verifyRecipe = Object.keys(localStarted[typeLocal]);

  function startedRecipe() {
    localStarted[typeLocal] = {
      [id]: ingredients[0],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStarted));
  }

  return (
    <>
      { !verifyInProgress && !recipeIsDone && !verifyRecipe[0] === id
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
        !verifyInProgress && verifyRecipe[0] === id
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
      {
        verifyInProgress
        && (
          <Link to={ `${atualPath}/in-progress` }>
            <button
              className="button-start"
              data-testid="finish-recipe-btn"
            >
              Finish Recipe
            </button>
          </Link>
        )
      }
    </>
  );
}

StartButton.propTypes = {
  dataRecipe: PropTypes.arrayOf(PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    dateModified: PropTypes.string,
    strTags: PropTypes.string,
  })).isRequired,
};
