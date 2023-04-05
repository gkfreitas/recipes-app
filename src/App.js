import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Header from './components/Header';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/meals/:id/in-progress" component={ Recipe } />
        <Route path="/drinks/:id/in-progress" component={ Recipe } />
        <Route path="/drinks/:id" component={ Recipe } />
        <Route path="/meals/:id" component={ Recipe } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </>
  );
}

export default App;
