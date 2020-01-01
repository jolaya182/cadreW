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
import Temp from './Temp';
import pages from '../css/index.scss';

const HighLowRow = props => {
  const { todayPeriod } = props;
  return (
    <div className="Todayrow">
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
