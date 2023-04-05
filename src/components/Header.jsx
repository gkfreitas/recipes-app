import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  const [search, setSearch] = useState(false);
  const [atualPathInfos, setAtualPathInfos] = useState({});
  const history = useHistory();

  const headerInfos = {
    '/meals': {
      searchIcon: true,
      type: 'meal',
      title: 'Meals',
    },
    '/drinks': {
      searchIcon: true,
      type: 'drink',
      title: 'Drinks',
    },
    '/profile': {
      searchIcon: false,
      title: 'Profile',
    },
    '/done-recipes': {
      searchIcon: false,
      title: 'Done Recipes',
    },
    '/favorite-recipes': {
      searchIcon: false,
      title: 'Favorite Recipes',
    },
  };

  useEffect(() => {
    const updatePathInfos = () => {
      setAtualPathInfos(headerInfos[history.location.pathname]);
    };

    setAtualPathInfos(headerInfos[history.location.pathname]);

    const unlisten = history.listen(updatePathInfos);

    return () => {
      unlisten();
    };
  }, [history]);

  if (!atualPathInfos) return null;
  return (
    <header>
      <Link to="/profile">
        <img
          src="src/images/profileIcon.svg"
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>

      {atualPathInfos.searchIcon && (
        <button onClick={ () => setSearch(!search) }>
          <img
            alt="search icon"
            src="src/images/searchIcon.svg"
            data-testid="search-top-btn"
          />
        </button>
      )}

      <p data-testid="page-title">{atualPathInfos.title}</p>
      {search && (
        <SearchBar type={ atualPathInfos.type } />
      )}
    </header>
  );
}

export default Header;
