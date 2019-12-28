/**
 * title: GoogleApiWrapper.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: this component handles the basic wrapping of the google api and react component
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import key from '../keys';

export class MapContain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleTextSearch: this.props.googleTextSearch,
      // googleMapRef: React.createRef(),
      mapProps: null,
      places: [
        {
          lat: 47.4444,
          lng: -122.176
        },
        {
          lat: 47.4445,
          lng: -122.177
        }
      ]
    };
  }

  googleMapRef = React.createRef();

  componentWillReceiveProps(props) {
    console.log('state.googleMapRef', this.googleMapRef.current);
    // this.setState({ googleTextSearch: props.googleTextSearch });
    // if (!this.props.googleTextSearch.length) {
    //   console.log('>>>', this.state.mapProps, this.state.googleMapRef);
    //   console.log('map->', this.props);
    // }
    this.work(props.googleTextSearch);
  }

  work = googleTextSearch => {
    const { google } = this.props;
    // const { googleTextSearch } = this.state;
    const { map } = this.googleMapRef.current;
    console.log('map in map', map);
    console.log('state.googleMapRef', this.googleMapRef.current);

    // this.setState({ googleMapRef: map, mapProps });

    const service = new google.maps.places.PlacesService(map);
    const request = {
      // query: '433 robins st, roselle, new jersey 07203',
      query: googleTextSearch,
      fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i += 1) {
          // creatththateMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
        console.log('findplacef', mapProps);
      }
    });
  };

  fetchPlaces = (
    mapProps,
    map,
    googleTextSearch = this.state.googleTextSearch
  ) => {
    const { google } = mapProps;
    // const { googleTextSearch } = this.state;
    console.log('map in map', map);
    console.log('state.googleMapRef', this.googleMapRef);

    const service = new google.maps.places.PlacesService(map);
    const request = {
      // query: '433 robins st, roselle, new jersey 07203',
      query: googleTextSearch,
      fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i += 1) {
          // creatththateMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
        console.log('findplacef', mapProps);
      }
    });
    // console.log('service', service);
    // return service;
  };

  render() {
    const initialCenter = {
      lat: 47.4444,
      lng: -122.176
    };
    const mapStyles = {
      width: '100%',
      height: '100%'
    };
    const mark = { lat: 48, lng: -122.0 };

    // eslint-disable-next-line react/prop-types
    const { google } = this.props;
    const { places } = this.state;
    const { searchText } = this.props;
    const { work } = this;
    return (
      <div>
        MapContain
        <Map
          google={google}
          zoom={8}
          initialCenter={initialCenter}
          style={mapStyles}
          onReady={this.fetchPlaces}
          visible
          ref={this.googleMapRef}
        >
          {/* <Marker position={mark} /> */}
          {/* <Listing places={places} /> */}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key.t
})(MapContain);
