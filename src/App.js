import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Auth from './auth/Auth';
import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';

const auth = new Auth();

class App extends Component {
  constructor(props) {
    super(props);

    this.shoot = this.shoot.bind(this);
  }

  componentDidMount() {
    const self = this;

    auth.handleAuthentication(this.props);

    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }

  componentWillReceiveProps(nextProps) {
    auth.emitNewScore(nextProps, this.props)
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  shoot() {
    this.props.shoot(this.canvasMousePosition);
  }

  render() {
    const { angle, currentPlayer, gameState, players, startGame } = this.props;

    return (
      <Canvas
        angle={angle}
        currentPlayer={currentPlayer}
        auth={auth}
        gameState={gameState}
        players={players}
        shoot={this.shoot}
        startGame={startGame}
        trackMouse={event => this.trackMouse(event)}
      />
    );
  }
}

App.propTypes = {
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
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  moveObjects: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }),
  ),
  shoot: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

App.defaultProps = {
  currentPlayer: null,
  players: null,
};

export default App;
