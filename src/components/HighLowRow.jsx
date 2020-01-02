/**
 * title: HighLowRow.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get high and low in row
 */
import React from 'react';
import PropTypes from 'prop-types';
import Temp from './Temp';
import Day from './Day';

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
        <Day name={todayPeriod.hi.name} />
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
  todayPeriod: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ])
  )
};
HighLowRow.defaultProps = {
  todayPeriod: null
};
