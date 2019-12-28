/**
 * title: Address.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Address
 */
import React from 'react';
import MapContainer from './MapContainer';

const Address = props => {
  const { getText, searchText, googleTextSearch } = props;
  return (
    <div>
      <label>Address </label>
      <input type="text" value={searchText} onChange={getText} />
      <MapContainer googleTextSearch={googleTextSearch} />
    </div>
  );
};
export default Address;
