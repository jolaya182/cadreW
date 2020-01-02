/**
 * title: HourTempRowHeader.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to dispaly a row with hour and temperature header
 */
import React from 'react';
import DataCell from './DataCell';

/**
 *
 *
 * @returns jsx component
 */
const HourTempRowHeader = () => {
  return (
    <div className="Todayrow rowHeader">
      <DataCell name="Time" />
      <DataCell name="Temperature" />
    </div>
  );
};
export default HourTempRowHeader;
