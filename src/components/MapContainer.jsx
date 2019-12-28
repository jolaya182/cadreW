/**
 * title: MapContainer.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to get users Today
 */
import React from 'react';
import GmapImage from './GmapImage';
import GoogleApiWrapper from './GoogleApiWrapper';

const MapContainer = props => {
  const { googleTextSearch } = props;
  return (
    <div>
      MapContainer
      <GmapImage> </GmapImage>
      <GoogleApiWrapper googleTextSearch={googleTextSearch} />
    </div>
  );
};
export default MapContainer;
