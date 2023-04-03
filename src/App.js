import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals" component={ Meals } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
