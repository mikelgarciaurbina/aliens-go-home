import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Auth from './auth/Auth';
import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';

const auth = new Auth();

class App extends Component {
  componentDidMount() {
    const self = this;

    auth.handleAuthentication();

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

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    const { angle, gameState, startGame } = this.props;

    return (
      <Canvas
        angle={angle}
        auth={auth}
        gameState={gameState}
        startGame={startGame}
        trackMouse={event => this.trackMouse(event)}
      />
    );
  }
}

App.propTypes = {
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
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;
