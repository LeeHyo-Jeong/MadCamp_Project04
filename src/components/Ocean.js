import React from 'react';
import '../Ocean.css';
import arrow_left from "../images/arrow_left.png";
import arrow_right from "../images/arrow_right.png";
import Fish from './fishes';
import Jellyfish from './jellyfish';
import Seaweed from './seaweed';

const Ocean = () => {
  return (
    <div className="dream-sea">
      <header className="header">
        <button className="nav-button"><img src={arrow_left} alt="Left" /></button>
        <h1 className="title">000님의 7월의 꿈의 바다</h1>
        <button className="nav-button"><img src={arrow_right} alt="Right" /></button>
      </header>

      <main className="main-content">
        <Jellyfish/>
        <Jellyfish/>
        <Jellyfish/>
      </main>

      <main className="main-content">
        <Fish/>
        <Fish/>
        <Fish/>
      </main>

      <main className="main-content">
        <Seaweed/>
        <Seaweed/>
        <Seaweed/>
      </main>

      <footer className="footer">
        <button className="bottom-button">새로운 꿈을 꾸셨나요?</button>
      </footer>
    </div>
  );
};

export default Ocean;