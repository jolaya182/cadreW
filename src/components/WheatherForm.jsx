/**
 * title: WheatherForm.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to hold all forms
 */
import React from 'react';
import FavList from './FavList';
import Address from './Address';

const WheatherForm = props => {
  const {
    updateSearchText,
    getText,
    searchText,
    saveLoc,
    favLocs,
    selectedFavLoc
  } = props;
  // console.log(
  //   'searchTExt: ',
  //   searchText,
  //   ' googleTextSearch: ',
  //   googleTextSearch
  // );
  return (
    <div>
      <form onSubmit={updateSearchText}>
        <Address searchText={searchText} getText={getText} saveLoc={saveLoc} />
        <FavList favLocs={favLocs} selectedFavLoc={selectedFavLoc} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
export default WheatherForm;
