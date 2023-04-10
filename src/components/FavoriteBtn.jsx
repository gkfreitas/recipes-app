import { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe, dataTest, click }) {
  const {
    id,
    type,
    strArea: nationality,
    strCategory: category,
    strAlcoholic: alcoholicOrNot,
    [`str${type}`]: name,
    [`str${type}Thumb`]: image } = recipe;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes.find((e) => e.id === id),
  );
  const handleFavorite = () => {
    const newFavoriteRecipes = isFavorite
      ? favoriteRecipes.filter((e) => e.id !== id) : [
        ...favoriteRecipes,
        {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        },
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
