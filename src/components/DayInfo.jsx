/**
 * title: DayInfo.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users DayInfo
 */
import React from 'react';

const DayInfo = props => {
  const { dayInfo } = props;
  return (
    <div>{dayInfo && `${dayInfo.temperature} ${dayInfo.temperatureUnit}`}</div>
  );
};
export default DayInfo;
