import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [showLinkCopiedMessage, setShowLinkCopiedMessage] = useState(false);
  const [filter, setFilter] = useState('all');

  const seconds = 2000;

  const handleShareButtonClick = (recipe) => {
    clipboardCopy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setShowLinkCopiedMessage({ id: recipe.id, show: true });

    setTimeout(() => {
      setShowLinkCopiedMessage({ id: recipe.id, show: false });
    }, seconds);
  };

  return (
    <div>
      <button
        onClick={ () => setFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => setFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        doneRecipes
          .filter((recipe) => filter === 'all' || filter === recipe.type)
          .map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.image }
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.type === 'drink'
                  ? recipe.alcoholicOrNot : recipe.nationality} - ${recipe.category}`}
              </p>
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button
                onClick={ () => handleShareButtonClick(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                />
              </button>
              {showLinkCopiedMessage.show
            && showLinkCopiedMessage.id === recipe.id
            && (
              <p>Link copied!</p>
            )}
              <div>
                {
                  recipe.tags.map((tag) => (
                    <p
                      key={ tag + index }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>
                  ))
                }
              </div>

            </div>
          ))
      }
    </div>
  );
}
