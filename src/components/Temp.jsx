/**
 * title: Temp.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to display temperature number and unit
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const Temp = props => {
  const { temp } = props;
  return (
    <div className="column">
      <div className="row">
        <div className="row">{`${temp.temperature} ${temp.temperatureUnit}`}</div>

        <div className="row">
          <img
            className=" column weatherIcon"
            src={temp.icon}
            alt="weatherIcon"
          />
        </div>
      </div>
    </div>
  );
};
export default Temp;

Temp.propTypes = {
  temp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
  )
};
Temp.defaultProps = {
  temp: null
};
