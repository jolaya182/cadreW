/**
 * title: DayTempRow.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to dispaly a name with hour and temperature
 */
import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import Temp from './Temp';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const DayTempRow = props => {
  const { dayInfo } = props;
  const { high, low } = dayInfo;
  return (
    <div className="Todayrow">
      <Day name={high.name} />
      <Temp temp={high} />
      <Temp temp={low} />
    </div>
  );
};
export default DayTempRow;

DayTempRow.propTypes = {
  dayInfo: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
DayTempRow.defaultProps = {
  dayInfo: null
};
