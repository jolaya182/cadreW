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
import DataCell from './DataCell';
import Picture from './Picture';

const HourTempRowHeader = props => {
  const { timeString, temp } = props;
  return (
    <div className="Todayrow rowHeader">
      <DataCell name="Time" />
      <DataCell name="Temperature" />
    </div>
  );
};
export default HourTempRowHeader;
