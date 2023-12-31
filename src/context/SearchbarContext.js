import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFilters } from '../services/handleSearch';

const searchContext = createContext();

export default function SearchProvider({ children }) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [atualPath, setAtualPath] = useState(history.location.pathname);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [filters, setFilters] = useState([]);

  const updatePathInfos = async () => {
    setAtualPath(history.location.pathname);
    if (history.location.pathname === '/meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const mealsData = await response.json();
      setData(mealsData.meals);
      getFilters(setFilters, history.location.pathname);
    }
    if (history.location.pathname === '/drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinkData = await response.json();
      setData(drinkData.drinks);
      getFilters(setFilters, history.location.pathname);
    }
  };

  useEffect(() => {
    setAtualPath(history.location.pathname);

    const unlisten = history.listen(updatePathInfos);
    updatePathInfos();

    return () => {
      unlisten();
    };
  }, [resetTrigger]);

  const values = useMemo(() => ({
    data, setData, atualPath, filters, setResetTrigger,
  }), [data, atualPath, filters]);

  return (
    <searchContext.Provider value={ values }>
      { children }
    </searchContext.Provider>
  );
}

export const useSearch = () => useContext(searchContext);

SearchProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
