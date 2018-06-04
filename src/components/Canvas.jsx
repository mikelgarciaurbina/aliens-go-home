import React from 'react';
import PropTypes from 'prop-types';

import CannonBall from './CannonBall';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Ground from './Ground';
import Heart from './Heart';
import Leaderboard from './Leaderboard';
import Sky from './Sky';
import StartGame from './StartGame';
import Title from './Title';

const Canvas = ({ angle, auth, currentPlayer, gameState, players, startGame, trackMouse }) => {
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
          <Leaderboard auth={auth} currentPlayer={currentPlayer} leaderboard={players} />
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
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
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
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired,
};

Canvas.defaultProps = {
  currentPlayer: null,
  players: null,
};

export default Canvas;
