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
import Picture from './Picture';
import SaveIcon from '../pictures/SaveIcon.svg';
import Search from '../pictures/Search.svg';

const Address = props => {
  const { getText, searchText, saveLoc } = props;
  return (
    <div className="row save">
      <Picture picture={Search} />
      <div className="column">
        <input
          type="text"
          value={searchText}
          onChange={getText}
          placeholder={searchText}
        />
      </div>
      <div className="column" onClick={saveLoc}>
        <Picture picture={SaveIcon} />
      </div>
    </div>
  );
};
export default Address;
