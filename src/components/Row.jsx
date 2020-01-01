/**
 * title: row.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Today
 */
import React from 'react';
import pages from '../css/index.scss';

const Row = () => {
  return (
    <div className="Todayrow rowHeader">
      <div className="TodayCol"> High</div>
      <div className="TodayCol"> Low</div>
    </div>
  );
};
export default Row;
