/**
 * title: HourTempRowHeader.jsx
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

const HourTempRowHeader = props => {
  const { timeString, temp } = props;
  return (
    <div className="Todayrow rowHeader">
      <Hour timeString="Time" />
      <Hour timeString="Temperature" />
    </div>
  );
};
export default HourTempRowHeader;
