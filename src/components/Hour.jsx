/**
 * title: Hour.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: hour component for the hourly temperature
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const Hour = props => {
  const { timeString } = props;
  return <div className="column">{`${timeString} `}</div>;
};
export default Hour;

Hour.propTypes = {
  timeString: PropTypes.string
};
Hour.defaultProps = {
  timeString: null
};
