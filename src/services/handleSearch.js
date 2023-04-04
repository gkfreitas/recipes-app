export const handleSearch = async (searchValues, history, type, global) => {
  const { searchInput, searchRadio } = searchValues;
  const searchEnpoints = type === 'meal'
    ? {
      ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
      name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
      'first-letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
    } : {
      ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`,
      name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`,
      'first-letter': `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`,
    };
  if (searchRadio === 'first-letter' && searchInput.length > 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const endpoint = searchEnpoints[searchRadio];
  const response = await fetch(endpoint);
  const data = await response.json();
  if (!data[`${type}s`]) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return [];
  }
  if (data[`${type}s`].length === 1) {
    if (type === 'meal') {
      history.push(`/meals/${data.meals[0].idMeal}`);
      return [];
    }
    history.push(`/drinks/${data.drinks[0].idDrink}`);
    return [];
  }
  return data[`${type}s`];
};
