/**
 * title: row.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Today
 */
import React from 'react';
import HiDay from './HiDay';
import LowDay from './LowDay';
import pages from '../css/index.scss';

const Row = props => {
  const { todayPeriod, alerts, hourlyForecastPeriod } = props;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return (
    <div className="dayRow">
      <div className="dayColumn"> high</div>
      <div className="dayColumn"> low</div>
    </div>
  );
};
export default Row;
