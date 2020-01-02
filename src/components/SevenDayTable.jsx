/**
 * title: SevenDayTable.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to display 7 day temperature
 */
import React from 'react';
import PropTypes from 'prop-types';
import DayTempRowHeader from './DayTempRowHeader';
import DayTempRow from './DayTempRow';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const SevenDayTable = props => {
  const { sevenDayForecastPeriod } = props;
  const sDays = new Array(7);
  sDays.fill(-1);

  return (
    <div className="todayBox">
      <div className="Todayrow">7 Day Weather</div>
      <DayTempRowHeader />
      {sevenDayForecastPeriod &&
        sevenDayForecastPeriod.map((dayInfo, ind) => {
          // const dayInfo = { name, temperature, temperatureUnit };
          return <DayTempRow dayInfo={dayInfo} key={ind} />;
        })}
    </div>
  );
};
export default SevenDayTable;

SevenDayTable.propTypes = {
  sevenDayForecastPeriod: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object])
  )
};
SevenDayTable.defaultProps = {
  sevenDayForecastPeriod: null
};
