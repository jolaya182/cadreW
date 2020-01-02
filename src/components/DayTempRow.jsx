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
import DataCell from './DataCell';
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
  const { name } = high;
  return (
    <div className="Todayrow">
      <DataCell name={name} />
      <Temp temp={high} />
      <Temp temp={low} />
    </div>
  );
};
export default DayTempRow;

DayTempRow.propTypes = {
  dayInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object]))
};
DayTempRow.defaultProps = {
  dayInfo: null
};
