import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Profile() {
  const localUser = JSON.parse(localStorage.getItem('user')) || { email: '' };
  return (
    <div data-testid="profile-email">
      <h2>{localUser.email}</h2>
      <div>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">Done Recipes</button>
        </Link>

        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        </Link>
        <Link to="/">
          <button
            onClick={ () => localStorage.clear() }
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
