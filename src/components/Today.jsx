/**
 * title: Today.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Today
 */
import React from 'react';
import HiDay from './HiDay';
import LowDay from './LowDay';

const Today = props => {
  const { todayPeriod, alerts, hourlyForecastPeriod } = props;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return (
    <div className=" column today">
      Today
      {todayPeriod.hi && <HiDay dayInfo={todayPeriod.hi} />}
      {todayPeriod.low && <LowDay dayInfo={todayPeriod.low} />}
      <div>
        {`severity alert : ${alerts.severity} Headline: ${alerts.alertHeadline}`}
      </div>
      {hourlyForecastPeriod &&
        hourlyForecastPeriod.map((hour, indx) => {
          const time = new Date(hour.startTime);
          const timeString = time.toLocaleString('en-US', options);
          return (
            <div key={indx}>
              {`${timeString}: ${hour.temperature} ${hour.temperatureUnit}`}
            </div>
          );
        })}
    </div>
  );
};
export default Today;
