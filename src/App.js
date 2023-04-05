import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/meals/:id-da-receita/in-progress" component={ Recipe } />
        <Route path="/drinks:id-da-receita/in-progress" component={ Recipe } />
        <Route path="/drinks:id-da-receita" component={ Recipe } />
        <Route path="/meals/:id-da-receita" component={ Recipe } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </>
  );
}

export default App;
