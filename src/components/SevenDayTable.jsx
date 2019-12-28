/**
 * title: SevenDayTable.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users SevenDayTable
 */
import React from 'react';
import Day from './Day';

const SevenDayTable = () => {
  const sDays = new Array(7);
  sDays.fill(-1);

  return (
    <div>
      SevenDayTable
      {sDays.map((el, ind) => {
        return <Day key={ind} />;
      })}
    </div>
  );
};
export default SevenDayTable;
