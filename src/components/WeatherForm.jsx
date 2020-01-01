/**
 * title: WeatherForm.jsx
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
import pages from '../css/index.scss';

const WeatherForm = props => {
  const {
    updateSearchText,
    getText,
    searchText,
    saveLoc,
    favLocs,
    selectedFavLoc
  } = props;

  return (
    <div className="Todayrow">
      <form className="form" onSubmit={updateSearchText}>
        <Address searchText={searchText} getText={getText} saveLoc={saveLoc} />
        <FavList favLocs={favLocs} selectedFavLoc={selectedFavLoc} />
      </form>
    </div>
  );
};
export default WeatherForm;
