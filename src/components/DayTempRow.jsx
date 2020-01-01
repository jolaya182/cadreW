/**
 * title: DayTempRow.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to dispaly a row with hour and temperature
 */
import React from 'react';
import Day from './Day';
import Temp from './Temp';
import Picture from './Picture';

const DayTempRow = props => {
  const {
    dayInfo
    // , low
  } = props;
  // name, temperature, temperatureUnit
  const { high, low } = dayInfo;
  // console.log('high', high);
  return (
    <div className="Todayrow">
      <Day name={high.name} />
      <Temp temp={high} />
      <Temp temp={low} />
    </div>
  );
};
export default DayTempRow;
