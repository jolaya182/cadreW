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

/**
 *
 *
 * @param {*} { picture }
 * @returns jsx component
 */
const Picture = ({ picture }) => (
  <div className="column">
    <img
      className="pic"
      src={picture}
      onError={e => {
        e.target.onerror = null;
        e.target.src = proPic;
      }}
      alt="profile"
    />
  </div>
);
Picture.defaultProps = {
  picture: proPic
};

Picture.propTypes = {
  picture: PropTypes.node
};

export default Picture;
