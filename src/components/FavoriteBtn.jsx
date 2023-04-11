import PropTypes from 'prop-types';
import { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe, dataTest, click }) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes.some((e) => e.id === recipe.id),
  );

  const handleFavorite = () => {
    const newFavoriteRecipes = isFavorite
      ? favoriteRecipes.filter((e) => e.id !== recipe.id) : [
        ...favoriteRecipes,
        recipe,
      ];
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newFavoriteRecipes),
    );
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={ () => {
        handleFavorite();
        if (click) click();
      } }
    >
      <img
        data-testid={ dataTest || 'favorite-btn' }
        alt="heart"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  dataTest: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

export default FavoriteBtn;
