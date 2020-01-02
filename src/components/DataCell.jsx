/**
 * title: DataCell.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: Day component for the simple string display in a table
 */
import React from 'react';
import PropTypes from 'prop-types';

const DataCell = props => {
  const { name } = props;
  return <div className="column">{`${name} `}</div>;
};
export default DataCell;

DataCell.propTypes = {
  name: PropTypes.string
};
DataCell.defaultProps = {
  name: null
};
