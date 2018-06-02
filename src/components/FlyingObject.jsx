import React from 'react';
import PropTypes from 'prop-types';

import FlyingObjectBase from './FlyingObjectBase';
import FlyingObjectTop from './FlyingObjectTop';

const FlyingObject = ({ position }) => (
  <g>
    <FlyingObjectBase position={position} />
    <FlyingObjectTop position={position} />
  </g>
);

FlyingObject.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default FlyingObject;
