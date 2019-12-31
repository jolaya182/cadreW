/**
 * title: SevenDayForecast.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users SevenDayForecast
 */
import React from 'react';
import SevenDayTable from './SevenDayTable';

const SevenDayForecast = props => {
  const { sevenDayForecastPeriod } = props;
  return (
    <div>
      SevenDayForecast
      {sevenDayForecastPeriod && (
        <SevenDayTable sevenDayForecastPeriod={sevenDayForecastPeriod} />
      )}
    </div>
  );
};
export default SevenDayForecast;
