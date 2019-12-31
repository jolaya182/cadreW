/**
 * title: Temp.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Day
 */
import React from 'react';
import Picture from './Picture';

const Temp = props => {
  const { temp } = props;
  return (
    <div className="column">{`${temp.temperature} ${temp.temperatureUnit}`}</div>
  );
};
export default Temp;
