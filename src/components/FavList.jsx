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
    <label>
      select fav location
      <select defaultValue="defaultValue" onChange={selectedFavLoc}>
        {favLocs &&
          favLocs.map((address, indx) => {
            return (
              <option key={indx} value={`${address}`}>
                {`${address}`}
              </option>
            );
          })}
      </select>
    </label>
  );
};
export default FavList;
