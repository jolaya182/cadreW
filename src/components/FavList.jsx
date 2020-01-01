/**
 * title: FavList.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users favorite location
 */
import React from 'react';

const FavList = props => {
  const { favLocs, selectedFavLoc } = props;
  return (
    <div className="row">
      {/* <div className="column"> */}
      {/* <label className="column">select fav location</label> */}
      <select
        className="column"
        defaultValue="defaultValue"
        onChange={selectedFavLoc}
      >
        {favLocs &&
          favLocs.map((address, indx) => {
            return (
              <option key={indx} value={`${address}`}>
                {`${address}`}
              </option>
            );
          })}
      </select>
      {/* </div> */}
    </div>
  );
};
export default FavList;
