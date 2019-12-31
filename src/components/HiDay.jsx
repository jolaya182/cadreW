/**
 * title: Day.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Day
 */
import React from 'react';
import DayInfo from './DayInfo';
import Picture from './Picture';

const HiDay = props => {
  const { dayInfo } = props;
  return (
    <div>
      {dayInfo && <div>{`${dayInfo.name} temperature:`}</div>}
      Hi
      <DayInfo dayInfo={dayInfo} />
    </div>
  );
};
export default HiDay;
