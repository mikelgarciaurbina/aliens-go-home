import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'auth0-web';

import CannonBall from './CannonBall';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Ground from './Ground';
import Heart from './Heart';
import Login from './Login';
import Sky from './Sky';
import StartGame from './StartGame';
import Title from './Title';

const Canvas = ({ angle, gameState, startGame, trackMouse }) => {
  const gameHeight = 1200;
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight,
  ];

  return (
    <svg
      id="aliens-go-home-canvas"
      onMouseMove={trackMouse}
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      <CannonPipe rotation={angle} />
      <CannonBase />
      <CannonBall position={{ x: 0, y: -100 }} />
      <CurrentScore score={15} />
      {!gameState.started && (
        <g>
          <StartGame onClick={() => startGame()} />
          <Title />
          <Login authenticate={signIn} />
        </g>
      )}
      {gameState.started &&
        gameState.flyingObjects.map(flyingObject => (
          <FlyingObject
            key={flyingObject.id}
            position={flyingObject.position}
          />
        ))}
      <Heart position={{ x: -300, y: 35 }} />
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    flyingObjects: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    started: PropTypes.bool.isRequired,
  }).isRequired,
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired,
};

export default Canvas;
