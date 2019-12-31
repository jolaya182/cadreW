/**
 * title: Day.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users LowDay
 */
import React from 'react';
import DayInfo from './DayInfo';
import Picture from './Picture';

const LowDay = props => {
  const { dayInfo } = props;
  return (
    <div>
      Low
      {/* <Picture /> */}
      <DayInfo dayInfo={dayInfo} />
    </div>
  );
};
export default LowDay;
