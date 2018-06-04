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

const Canvas = ({ angle, auth, gameState, startGame, trackMouse }) => {
  const gameHeight = 1200;
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight,
  ];
  const leaderboard = [
    {
      id: 'd4',
      maxScore: 82,
      name: 'Ado Kukic',
      picture: 'https://twitter.com/KukicAdo/profile_image',
    },
    {
      id: 'a1',
      maxScore: 235,
      name: 'Bruno Krebs',
      picture: 'https://twitter.com/brunoskrebs/profile_image',
    },
    {
      id: 'c3',
      maxScore: 99,
      name: 'Diego Poza',
      picture: 'https://twitter.com/diegopoza/profile_image',
    },
    {
      id: 'b2',
      maxScore: 129,
      name: 'Jeana Tahnk',
      picture: 'https://twitter.com/jeanatahnk/profile_image',
    },
    {
      id: 'e5',
      maxScore: 34,
      name: 'Jenny Obrien',
      picture: 'https://twitter.com/jenny_obrien/profile_image',
    },
    {
      id: 'f6',
      maxScore: 153,
      name: 'Kim Maida',
      picture: 'https://twitter.com/KimMaida/profile_image',
    },
    {
      id: 'g7',
      maxScore: 55,
      name: 'Luke Oliff',
      picture: 'https://twitter.com/mroliff/profile_image',
    },
    {
      id: 'h8',
      maxScore: 146,
      name: 'Sebastián Peyrott',
      picture: 'https://twitter.com/speyrott/profile_image',
    },
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
          <Leaderboard auth={auth} currentPlayer={leaderboard[6]} leaderboard={leaderboard} />
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
