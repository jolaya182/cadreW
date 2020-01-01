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
import HiDay from './HiDay';
import LowDay from './LowDay';
import pages from '../css/index.scss';

const HighLowRow = props => {
  const { todayPeriod, alerts, hourlyForecastPeriod, dayInfo } = props;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return (
    <div className="Todayrow">
      <div className="TodayCol">
        <HiDay dayInfo={dayInfo.hi} />
      </div>
      <div className="TodayCol">
        <LowDay dayInfo={dayInfo.low} />
      </div>
    </div>
  );
};
export default HighLowRow;
