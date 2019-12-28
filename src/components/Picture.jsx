/**
 * title: Picture.js
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to hold the picture
 */

import React from 'react';
import PropTypes from 'prop-types';
import proPic from '../pictures/profile.png';

const Picture = ({ picture }) => (
  <a href="/">
    <img
      className="pic"
      src={picture}
      onError={e => {
        e.target.onerror = null;
        e.target.src = proPic;
      }}
      alt="profile"
    />
  </a>
);
Picture.defaultProps = {
  picture: proPic
};

Picture.propTypes = {
  picture: PropTypes.node
};

export default Picture;
