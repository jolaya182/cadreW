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
import PropTypes from 'prop-types';
import HighLowRow from './HighLowRow';
import DayTempRowHeader from './DayTempRowHeader';
import HourTempRow from './HourTempRow';
import HourTempRowHeader from './HourTempRowHeader';
import Alert from './Alert';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const Today = props => {
  const {
    todayPeriod,
    alerts,
    hourlyForecastPeriod,
    showHeadline,
    showingHeadline
  } = props;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return (
    <div className="todayBox">
      {todayPeriod && (
        <div className="Todayrow">{`${todayPeriod.hi.name}'s Weather`}</div>
      )}
      <DayTempRowHeader />
      {todayPeriod.hi && todayPeriod.low && (
        <HighLowRow todayPeriod={todayPeriod} />
      )}
      {alerts && (
        <Alert
          showHeadline={showHeadline}
          showingHeadline={showingHeadline}
          alerts={alerts}
        />
      )}
      <HourTempRowHeader />
      {hourlyForecastPeriod &&
        hourlyForecastPeriod.map((temp, indx) => {
          const time = new Date(temp.startTime);
          const timeString = time.toLocaleString('en-US', options);
          return <HourTempRow key={indx} timeString={timeString} temp={temp} />;
        })}
    </div>
  );
};
export default Today;

Today.propTypes = {
  todayPeriod: PropTypes.objectOf(PropTypes.object),
  alerts: PropTypes.objectOf(PropTypes.string),
  hourlyForecastPeriod: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object])
  ),
  showHeadline: PropTypes.func,
  showingHeadline: PropTypes.bool
};
Today.defaultProps = {
  todayPeriod: null,
  alerts: null,
  hourlyForecastPeriod: null,
  showHeadline: null,
  showingHeadline: null
};
