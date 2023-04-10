/* eslint-disable complexity */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Recommendations.css';
import { useSearch } from '../context/SearchbarContext';
import blackHeathIcon from '../images/blackHeartIcon.svg';
import whiteHeathIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton({ dataRecipe }) {
  const [isFavorite, setFavorite] = useState(false);
  const { atualPath } = useSearch();
  const { id } = useParams();
  const type = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';
  const recipesLoaded = dataRecipe.length === 1;

  const alcoholicOrNot = type === 'Drink'
   && recipesLoaded ? dataRecipe[0].strAlcoholic : '';
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const dataRecipes = recipesLoaded && {
    id: dataRecipe[0][`id${type}`],
    type: type.toLowerCase(),
    nationality: dataRecipe[0].strArea || '',
    category: dataRecipe[0].strCategory,
    alcoholicOrNot,
    name: dataRecipe[0][`str${type}`],
    image: dataRecipe[0][`str${type}Thumb`],
  };

  const favoriteString = JSON.stringify([...localFavorites, dataRecipes]);

  const localSave = () => {
    localStorage.setItem('favoriteRecipes', favoriteString);
    const verifyFavorite = localFavorites?.some((e) => e.id === id);
    setFavorite(!verifyFavorite);
    console.log(localFavorites);
  };

  useEffect(() => {
    const verifyFavorite = localFavorites?.some((e) => e.id === id);
    setFavorite(!verifyFavorite);
  }, [localSave]);

  return (
    <button
      aria-label="save"
      type="button"
      onClick={ () => localSave() }
      src={ isFavorite ? whiteHeathIcon : blackHeathIcon }
      data-testid="favorite-btn"
      className="favorite-btn"
    >
      <img alt="Favorite button" src={ isFavorite ? whiteHeathIcon : blackHeathIcon } />
    </button>
  );
}

FavoriteButton.propTypes = {
  dataRecipe: PropTypes.arrayOf(PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    dateModified: PropTypes.string,
    strTags: PropTypes.string,
  })).isRequired,
};
