import React from 'react';
import '../App.css';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className='hero-container'>
      <img src='/static/image-3.jpg' alt='air_plane' style={{height:"103%"}}></img>
      <h1>BOOK A FLIGHT</h1>
      <p>What are you waiting for?</p>
    </div>
  );
}

export default HeroSection;
