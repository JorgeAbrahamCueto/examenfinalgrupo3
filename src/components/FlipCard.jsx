import React from 'react';
import './FlipCard.css';

const FlipCard = ({ src, alt, text }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={src} alt={alt} className="card-img" />
        </div>
        <div className="flip-card-back">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;