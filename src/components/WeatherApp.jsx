/**
 * title: WeatherApp.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to hold all forms and day forecast
 */
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import WeatherForm from './WeatherForm';
import Today from './Today';
import SevenDayTable from './SevenDayTable';
import key from '../keys';

export class WeatherApp extends React.Component {
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
      favLocTable: new Set(),
      showingHeadline: false
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('WeatherAppLoc')) {
      this.setState({
        favLocs: sessionStorage.getItem('WeatherAppLoc').split(','),
        favLocTable: this.createSet(
          this.createSet(
            sessionStorage.getItem('WeatherAppLocTable').split(',')
          )
        ),
        googleTextSearch: sessionStorage.getItem('googleTextSearch'),
        searchText: sessionStorage.getItem('googleTextSearch')
      });
    }
    if (sessionStorage.getItem('googleTextSearch')) {
      this.fetchGooglePlace(sessionStorage.getItem('googleTextSearch'));
    }
  }

  componentDidUpdate() {
    const { googleTextSearch } = this.state;
    sessionStorage.setItem('googleTextSearch', googleTextSearch);
  }

  createSet = stringedJson => {
    const newSet = new Set();
    stringedJson.forEach(el => {
      newSet.add(el);
    });
    return newSet;
  };

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
    const sevenDayForecastPeriod = this.processSevenDayPeriod(
      json.properties.periods
    );
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
      severity: '',
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
    // console.log('favLocs', favLocs);
    if (!favLocTable.has(googleTextSearch)) {
      favLocTable.add(googleTextSearch);
      const newFavLocTable = new Set(favLocTable);
      // const newFavLocs = [...favLocs];
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
    sessionStorage.setItem('WeatherAppLoc', newFavLocs);
    sessionStorage.setItem(
      'WeatherAppLocTable',
      this.convertToArray(newFavLocTable)
    );
  };

  convertToArray = st => {
    const retArry = [];
    for (const item of st) {
      retArry.push(item);
    }
    return retArry;
  };

  showHeadline = () => {
    console.log('showHeadline');
    const { showingHeadline } = this.state;
    this.setState({ showingHeadline: !showingHeadline });
  };

  processSevenDayPeriod = period => {
    const retAry = [];
    period.forEach((halfDay, ind, ary) => {
      if (ind === 0) return;
      if (halfDay.number % 2 === 0) {
        retAry.push({ low: halfDay, high: ary[ind - 1] });
      }
    });
    // console.log('retAry', retAry);
    return retAry;
  };

  render() {
    const {
      updateSearchText,
      getText,
      fetchGoogleDefaultPlace,
      saveLoc,
      selectedFavLoc,
      showHeadline
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
      favLocs,
      showingHeadline
    } = this.state;
    // eslint-disable-next-line react/prop-types
    const { google } = this.props;

    const initialCenter = {
      lat: 47.4444,
      lng: -122.176
    };
    const mapStyles = {
      width: '80%',
      height: '100%'
    };
    const mark = { lat, lng };
    return (
      <div className="dayRow">
        <div className=" bluish">
          <WeatherForm
            updateSearchText={updateSearchText}
            searchText={searchText}
            getText={getText}
            saveLoc={saveLoc}
            favLocs={favLocs}
            selectedFavLoc={selectedFavLoc}
          />
          <div className="column">
            {comp === 'Today' && todayPeriod && (
              <div className="row ">
                <Today
                  todayPeriod={todayPeriod}
                  alerts={alerts}
                  hourlyForecastPeriod={hourlyForecastPeriod}
                  showHeadline={showHeadline}
                  showingHeadline={showingHeadline}
                />
              </div>
            )}
            {comp === 'SevenDays' && sevenDayForecastPeriod && (
              <div className="row ">
                <SevenDayTable
                  sevenDayForecastPeriod={sevenDayForecastPeriod}
                />
              </div>
            )}
          </div>
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
})(WeatherApp);
