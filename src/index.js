import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoginProvider from './context/LoginContext';
import RecipeProvider from './context/RecipeContext';
import SearchProvider from './context/SearchbarContext';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <LoginProvider>
        <SearchProvider>
          <RecipeProvider>
            <App />
          </RecipeProvider>
        </SearchProvider>
      </LoginProvider>
    </BrowserRouter>,

  );

serviceWorker.unregister();
