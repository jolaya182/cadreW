/**
 * title: Day.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: Day component for the hourly temperature
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const Day = props => {
  const { name } = props;
  return <div className="column">{`${name} `}</div>;
};
export default Day;

Day.propTypes = {
  name: PropTypes.string
};
Day.defaultProps = {
  name: null
};
