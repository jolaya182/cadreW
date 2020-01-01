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
import Hour from './Hour';
import Temp from './Temp';
import Picture from './Picture';

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
