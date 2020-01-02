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
import PropTypes from 'prop-types';
import FavList from './FavList';
import Address from './Address';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
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

WeatherForm.propTypes = {
  updateSearchText: PropTypes.func,
  getText: PropTypes.func,
  searchText: PropTypes.string,
  saveLoc: PropTypes.func,
  favLocs: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  selectedFavLoc: PropTypes.func
};

WeatherForm.defaultProps = {
  updateSearchText: null,
  getText: null,
  searchText: null,
  saveLoc: null,
  favLocs: null,
  selectedFavLoc: null
};
