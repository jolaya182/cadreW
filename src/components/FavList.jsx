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
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns jsx component
 */
const FavList = props => {
  const { favLocs, selectedFavLoc } = props;
  return (
    <div className="row">
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
    </div>
  );
};
export default FavList;

FavList.propTypes = {
  favLocs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  selectedFavLoc: PropTypes.func
};
FavList.defaultProps = {
  favLocs: null,
  selectedFavLoc: null
};
