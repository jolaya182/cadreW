/**
 * title: DayTempRowHeader.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to dispaly a row with hour and temperature
 */
import React from 'react';
import Day from './Day';
import DataCell from './DataCell';

/**
 *
 *
 * @returns jsx component
 */
const DayTempRowHeader = () => {
  return (
    <div className="Todayrow rowHeader">
      <Day name="Day" />
      <DataCell name="High" />
      <DataCell name="Low" />
    </div>
  );
};
export default DayTempRowHeader;
