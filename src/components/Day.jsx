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
import Picture from './Picture';

const Day = props => {
  const { name } = props;
  return <div className="column">{`${name} `}</div>;
};
export default Day;
