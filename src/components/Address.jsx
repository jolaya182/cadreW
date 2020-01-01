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

const Address = props => {
  const { getText, searchText, saveLoc } = props;
  return (
    <div>
      <label>Address </label>
      <input
        type="text"
        value={searchText}
        onChange={getText}
        placeholder={searchText}
      />
      <button type="button" onClick={saveLoc}>
        saveLoc
      </button>
    </div>
  );
};
export default Address;
