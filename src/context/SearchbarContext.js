import React, { createContext, useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

const searchContext = createContext();

export default function SearchProvider({ children }) {
  const [data, setData] = useState([]);

  const values = useMemo(() => ({
    data, setData,
  }), [data]);

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
