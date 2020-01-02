/**
 * title: DayTempRowHeader.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to dispaly a row with a day, hour and temperature table header
 */
import React from 'react';
import DataCell from './DataCell';

/**
 *
 *
 * @returns jsx component
 */
const DayTempRowHeader = () => {
  return (
    <div className="Todayrow rowHeader">
      <DataCell name="Day" />
      <DataCell name="High" />
      <DataCell name="Low" />
    </div>
  );
};
export default DayTempRowHeader;
