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

const FavList = () => {
  return (
    <label>
      pick your favorite loc
      <select defaultValue="defaultValue">
        <option value="loc 1">loc 1</option>
        <option value="loc 2">loc 2</option>
      </select>
    </label>
  );
};
export default FavList;
