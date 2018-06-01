import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';

const Canvas = ({ angle, trackMouse }) => {
  const viewBox = [
    window.innerWidth / -2,
    100 - window.innerHeight,
    window.innerWidth,
    window.innerHeight,
  ];

  return (
    <svg
      id="aliens-go-home-canvas"
      onMouseMove={trackMouse}
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
    >
      <Sky />
      <Ground />
      <CannonPipe rotation={angle} />
      <CannonBase />
    </svg>
  );
};
Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  trackMouse: PropTypes.func.isRequired,
};

export default Canvas;
