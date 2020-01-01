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
import HiDay from './HiDay';
import LowDay from './LowDay';

const SevenDayTable = props => {
  const { sevenDayForecastPeriod } = props;
  const sDays = new Array(7);
  sDays.fill(-1);

  return (
    <div className="todayBox">
      SevenDayTable
      {sevenDayForecastPeriod &&
        sevenDayForecastPeriod.map((dayObj, ind) => {
          const { name, temperature, temperatureUnit } = dayObj;
          const dayInfo = { name, temperature, temperatureUnit };
          // console.log('dayObj', dayObj, 'dayInfo', dayInfo);
          return dayObj.number % 2 === 0 ? (
            <LowDay dayInfo={dayInfo} key={ind} />
          ) : (
            <HiDay dayInfo={dayInfo} key={ind} />
          );
        })}
    </div>
  );
};
export default SevenDayTable;
