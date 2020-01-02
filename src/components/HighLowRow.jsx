/**
 * title: HighLowRow.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to display the day high and low temperature in row
 */
import React from 'react';
import PropTypes from 'prop-types';
import Temp from './Temp';
import DataCell from './DataCell';
/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const HighLowRow = props => {
  const { todayPeriod } = props;
  return (
    <div className="Todayrow">
      <div className="TodayCol">
        <DataCell name={todayPeriod.hi.name} />
      </div>
      <div className="TodayCol">
        <Temp temp={todayPeriod.hi} />
      </div>
      <div className="TodayCol">
        <Temp temp={todayPeriod.low} />
      </div>
    </div>
  );
};
export default HighLowRow;

HighLowRow.propTypes = {
  todayPeriod: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object]))
};
HighLowRow.defaultProps = {
  todayPeriod: null
};
