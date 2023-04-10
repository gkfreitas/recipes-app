/* eslint-disable complexity */
import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import '../Recommendations.css';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const [linkCopy, setLinkCopy] = useState(false);

  const handleClick = () => {
    clipboardCopy(window.location.href);
    setLinkCopy(true);
  };

  return (
    <>
      <button
        data-testid="share-btn"
        className="share-btn"
        onClick={ () => handleClick() }
      >
        <img alt="Share button" src={ shareIcon } />
      </button>
      {linkCopy && <p>Link copied!</p>}
    </>
  );
}
