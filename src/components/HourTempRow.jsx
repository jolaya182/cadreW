/**
 * title: HourTempRow.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to dispaly a row with hour and temperature
 */
import React from 'react';
import PropTypes from 'prop-types';
import Hour from './Hour';
import Temp from './Temp';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const HourTempRow = props => {
  const { timeString, temp } = props;
  return (
    <div className="Todayrow">
      <Hour timeString={timeString} />
      <Temp temp={temp} />
    </div>
  );
};
export default HourTempRow;

HourTempRow.propTypes = {
  temp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
  ),
  timeString: PropTypes.string
};
HourTempRow.defaultProps = {
  temp: null,
  timeString: null
};
