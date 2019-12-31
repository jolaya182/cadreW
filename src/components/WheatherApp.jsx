/**
 * title: WheatherApp.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to hold all forms and day forecast
 */
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import WheatherForm from './WheatherForm';
import Today from './Today';
import SevenDayForecast from './SevenDayForecast';
import key from '../keys';

export class WheatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: props.comp,
      url: 'https://api.weather.gov/points/',
      alertUrl: 'https://api.weather.gov/alerts/active/area/',
      initialNoaaUrl: '',
      searchText: '',
      onEnter: null,
      lat: null,
      lng: null,
      googleTextSearch: '433 robins st, roselle, new jersey 07203',
      googleMapRef: React.createRef(),
      forecastUrl: '',
      forecastHourlyUrl: '',
      todayPeriod: '',
      sevenDayForecastPeriod: null,
      hourlyForecastPeriod: '',
      area: '',
      alerts: { alertHeadline: '', severity: '', description: '' },
      favLocs: [],
      favLocTable: new Set()
    };
  }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate', this.state);
  // }

  componentDidMount() {
    // console.log('sessionStorage', sessionStorage);
    if (sessionStorage.getItem('wheatherAppLoc')) {
      this.setState({
        favLocs: sessionStorage.getItem('wheatherAppLoc').split(','),
        favLocTable: JSON.parse(sessionStorage.getItem('wheatherAppLocTable'))
      });
    }
  }

  getNoaaInitRequest = json => {
    // console.log('getNoaaInitRequest', json);
    const { forecast, forecastHourly } = json.properties;
    const area = json.properties.relativeLocation.properties.state;
    // console.log('area', area);
    this.setState({
      forecastUrl: forecast,
      forecastHourlyUrl: forecastHourly,
      area
    });
    const { forecastUrl } = this.state;
    this.fetchMethod(forecastUrl, this.getNoaaTodayForecast);
  };

  getNoaaTodayForecast = json => {
    // console.log('getNoaaTodayForecast', json);
    const todayPeriod = {
      hi: json.properties.periods[0],
      low: json.properties.periods[1]
    };
    const sevenDayForecastPeriod = json.properties.periods;
    this.setState({ todayPeriod, sevenDayForecastPeriod });

    const { forecastHourlyUrl } = this.state;
    this.fetchMethod(forecastHourlyUrl, this.getNoaaTodayHourlyForecast);
  };

  getNoaaTodayHourlyForecast = json => {
    // console.log('getNoaaTodayHourlyForecast', json);
    const hourlyForecastPeriod = json.properties.periods.slice(0, 24);
    // console.log('hourlyForecastPeriod', hourlyForecastPeriod);
    this.setState({ hourlyForecastPeriod });

    const { alertUrl, area } = this.state;
    this.fetchMethod(alertUrl + area, this.getNoaaAreaAlerts);
  };

  getNoaaAreaAlerts = json => {
    // console.log('getNoaaAreaAlerts', json);
    const alerts = {
      alertHeadline: '',
      severity: 'none',
      description: ''
    };
    if (json.features.length > 0) {
      alerts.alertHeadline = json.features[0].properties.headline;
      alerts.severity = json.features[0].properties.severity;
      alerts.description = json.features[0].properties.description;
    }
    this.setState({ alerts });
  };

  fetchMethod = (url, callback) => {
    const options = {
      method: 'GET'
    };
    fetch(url, options)
      .then(
        response => {
          return response.json();
        },
        error =>
          this.errorMes('error from the server, check url or options', error)
      )
      .then(
        json => {
          if (json.status === 404)
            return this.errorMes('fetch return', json.status);
          // console.log('success', json);
          callback(json);
        },
        error => this.errorMes('error from ', error)
      );
  };

  errorMes = (mes, error) => {
    return console.log(mes, error);
  };

  fetchGoogleDefaultPlace = (mapProps, map) => {
    const { google } = mapProps;
    const { googleTextSearch } = this.state;
    // const { googleTextSearch } = this.state;
    // console.log('map in map', map);
    // console.log('state.googleMapRef', this.googleMapRef);

    const service = new google.maps.places.PlacesService(map);
    // service.listeners.zoom_changed.h.zoom = 12
    //  console.log("service", service);
    const request = {
      // query: '433 robins st, roselle, new jersey 07203',
      query: googleTextSearch,
      fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log('results', results[0].geometry.location);

        map.setCenter(results[0].geometry.location);
        // console.log('findplacef', mapProps);
      }
    });
    // console.log('service', service);
    // return service;
  };

  fetchGooglePlace = googleTextSearch => {
    // console.log('fetchGooglePlace->googleTextSearch', googleTextSearch);
    const { google } = this.props;
    // const { googleTextSearch } = this.state;
    const { map } = this.state.googleMapRef.current;
    // console.log('map in map', map);
    // console.log('state.googleMapRef', this.googleMapRef);

    // this.setState({ googleMapRef: map, mapProps });

    const service = new google.maps.places.PlacesService(map);
    const request = {
      // query: '433 robins st, roselle, new jersey 07203',
      query: googleTextSearch,
      fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        // console.log('results', results[0].geometry.location);
        // console.log('results lat', lat);
        // console.log('results lng', lng);

        map.setCenter(results[0].geometry.location);
        const newUrl = `${this.state.url + lat},${lng}`;
        // console.log('newUrl', newUrl);
        this.setState({ lat, lng, initialNoaaUrl: newUrl, googleTextSearch });
        this.fetchMethod(newUrl, this.getNoaaInitRequest);
      }
    });
  };

  updateSearchText = e => {
    e.preventDefault();
    // console.log('target', e.target);
    if (!this.setState.onEnter) this.setState({ onEnter: true });
    const { searchText } = this.state;
    this.fetchGooglePlace(searchText);
  };

  getText = e => {
    // console.log('e.target.value', e.target.value);
    this.setState({ searchText: e.target.value, onEnter: null });
  };

  saveLoc = e => {
    const { googleTextSearch, favLocs, favLocTable } = this.state;
    console.log('favLocs', favLocs);
    if (!favLocTable.has(googleTextSearch)) {
      favLocTable.add(googleTextSearch);
      const newFavLocTable = new Set(favLocTable);
      const newFavLocs = [...favLocs];
      newFavLocs.push(googleTextSearch);
      console.log('newFavLocs', newFavLocs);
      this.saveSessionStorage(newFavLocs, newFavLocTable);
      this.setState({ favLocs: newFavLocs, favLocTable: newFavLocTable });
    }
  };

  selectedFavLoc = e => {
    e.preventDefault();
    const googleTextSearch = e.target.value;
    // console.log(googleTextSearch);
    this.setState({
      googleTextSearch,
      searchText: googleTextSearch
    });
    this.fetchGooglePlace(googleTextSearch);
  };

  saveSessionStorage = (newFavLocs, newFavLocTable) => {
    sessionStorage.setItem('wheatherAppLoc', newFavLocs);
    sessionStorage.setItem(
      'wheatherAppLocTable',
      JSON.stringify(newFavLocTable)
    );
  };

  render() {
    const {
      updateSearchText,
      getText,
      fetchGoogleDefaultPlace,
      saveLoc,
      selectedFavLoc
    } = this;
    const {
      comp,
      searchText,
      googleMapRef,
      todayPeriod,
      alerts,
      hourlyForecastPeriod,
      sevenDayForecastPeriod,
      lat,
      lng,
      favLocs
    } = this.state;
    // eslint-disable-next-line react/prop-types
    const { google } = this.props;

    const initialCenter = {
      lat: 47.4444,
      lng: -122.176
    };
    const mapStyles = {
      width: '50%',
      height: '50%'
    };
    const mark = { lat, lng };
    return (
      <div className="row">
        <div className="column">
          <WheatherForm
            updateSearchText={updateSearchText}
            searchText={searchText}
            getText={getText}
            saveLoc={saveLoc}
            favLocs={favLocs}
            selectedFavLoc={selectedFavLoc}
          />
          {comp === 'Today' && todayPeriod && (
            <div className="row ">
              <Today
                todayPeriod={todayPeriod}
                alerts={alerts}
                hourlyForecastPeriod={hourlyForecastPeriod}
              />
            </div>
          )}
          {comp === 'SevenDays' && sevenDayForecastPeriod && (
            <SevenDayForecast sevenDayForecastPeriod={sevenDayForecastPeriod} />
          )}
        </div>

        <div className="columnGoogle">
          <Map
            google={google}
            zoom={10}
            initialCenter={initialCenter}
            style={mapStyles}
            onReady={fetchGoogleDefaultPlace}
            visible
            ref={googleMapRef}
          >
            <Marker position={mark} />
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key.t
})(WheatherApp);
