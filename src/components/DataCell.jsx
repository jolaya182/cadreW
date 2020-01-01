/**
 * title: DataCell.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: Day component for the hourly temperature
 */
import React from 'react';
import Picture from './Picture';

const DataCell = props => {
  const { name } = props;
  return <div className="column">{`${name} `}</div>;
};
export default DataCell;
