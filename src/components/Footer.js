import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer" className='footer'>
      <Link to="/drinks">
        <img src={drinkIcon} data-testid="drinks-bottom-btn"/>
      </Link>
      <Link to="/meals">
        <img src={mealIcon} data-testid="meals-bottom-btn"/>
      </Link>
    </div>
  );
}
