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
    <div className="column">
      <div className="row">
        <div className="row">{`${temp.temperature} ${temp.temperatureUnit}`}</div>

        <div className="row">
          <img className=" column weatherIcon" src={temp.icon} />
        </div>
      </div>
    </div>
  );
};
export default Temp;
