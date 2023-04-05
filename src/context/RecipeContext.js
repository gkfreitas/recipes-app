import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

export const RecipeContext = createContext();

export default function RecipeProvider({ children }) {
  const [recipeID, setRecipeID] = useState('');

  const values = useMemo(() => ({
    recipeID, setRecipeID,
  }), [recipeID]);

  return (
    <RecipeContext.Provider value={ values }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
