/**
 * title: WeatherApp.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to hold the search form and day forecast
 */
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';
import WeatherForm from './WeatherForm';
import Today from './Today';
import SevenDayTable from './SevenDayTable';
import key from '../keys';

/**
 *
 *
 * @export
 * @class WeatherApp
 * @extends {React.Component}
 */
export class WeatherApp extends React.Component {
  /**
   *Creates an instance of WeatherApp.
   * @param {*} props
   * @memberof WeatherApp
   *
   * @comp string
   * @url string
   * @alertUrl string
   * @initialNoaaUrl string
   * @searchText string
   * @onEnter bool
   * @lat int
   * @lng int
   * @googleTextSearch string
   * @googleMapRef object
   * @forecastUrl string
   * @forecastHourlyUrl string
   * @todayPeriod object
   * @sevenDayForecastPeriod array
   * @hourlyForecastPeriod array
   * @area string
   * @alerts object
   * @favLocs array
   * @favLocTable  Set
   * @showingHeadline bool
   *
   */
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
      googleTextSearch: '295 Lafayette St floor 5, New York, NY 10012',
      googleMapRef: React.createRef(),
      forecastUrl: '',
      forecastHourlyUrl: '',
      todayPeriod: '',
      sevenDayForecastPeriod: null,
      hourlyForecastPeriod: null,
      area: '',
      alerts: { alertHeadline: '', severity: '', description: '' },
      favLocs: [],
      favLocTable: new Set(),
      showingHeadline: false
    };
  }

  /**
   * checks wheather we have a list of previous searches
   *
   * @param
   * @returns
   */
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

  /**
   * keep track of the current location being searched
   *
   * @param
   * @returns
   */
  componentDidUpdate() {
    const { googleTextSearch } = this.state;
    sessionStorage.setItem('googleTextSearch', googleTextSearch);
  }

  /**
   * recreates the set since it was stored as a string in the sessionstorage variable
   *
   * @param string
   * @returns Set
   */
  createSet = stringedJson => {
    const newSet = new Set();
    stringedJson.forEach(el => {
      newSet.add(el);
    });
    return newSet;
  };

  /**
   * initial Request to get the links for hourly and 7 day forecast
   *
   * @param object
   * @returns
   */
  getNoaaInitRequest = json => {
    const { forecast, forecastHourly } = json.properties;
    const area = json.properties.relativeLocation.properties.state;
    this.setState({
      forecastUrl: forecast,
      forecastHourlyUrl: forecastHourly,
      area
    });
    const { forecastUrl } = this.state;
    this.fetchMethod(forecastUrl, this.getNoaaTodayForecast);
  };

  /**
   * fetches hourly forecast
   *
   * @param object
   * @returns
   */
  getNoaaTodayForecast = json => {
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

  /**
   * fetches hourly forecast
   *
   * @param object
   * @returns
   */
  getNoaaTodayHourlyForecast = json => {
    const hourlyForecastPeriod = json.properties.periods.slice(0, 24);
    this.setState({ hourlyForecastPeriod });

    const { alertUrl, area } = this.state;
    this.fetchMethod(alertUrl + area, this.getNoaaAreaAlerts);
  };

  /**
   * fetches alert for the current area
   *
   * @param object
   * @returns
   */
  getNoaaAreaAlerts = json => {
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

  /**
   * fetches 'get' requests to the url provided and execute callbacks as
   * part of code reuse
   *
   * @param string, function
   * @returns object
   */
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
          return callback(json);
        },
        error => this.errorMes('error from ', error)
      );
  };

  errorMes = (mes, error) => {
    return console.log(mes, error);
  };

  /**
   * fetches google place coordinates and uses 'mapProps.google' property as part of the
   * google-maps-react library.This function is used only for the 'onReady' Map
   * component as it is only used once
   *
   * @param {*} props
   * @returns
   */
  fetchGoogleDefaultPlace = (mapProps, map) => {
    const { google } = mapProps;
    const { googleTextSearch } = this.state;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      query: googleTextSearch,
      fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter(results[0].geometry.location);
      }
    });
  };

  /**
   * fetches the google place coordinate for the current locatin search
   *
   * @param string
   * @returns
   */
  fetchGooglePlace = googleTextSearch => {
    const { google } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { map } = this.state.googleMapRef.current;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      query: googleTextSearch,
      fields: ['name', 'geometry']
    };
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        map.setCenter(results[0].geometry.location);
        const { url } = this.state;
        const newUrl = `${url + lat},${lng}`;
        this.setState({ lat, lng, initialNoaaUrl: newUrl, googleTextSearch });
        this.fetchMethod(newUrl, this.getNoaaInitRequest);
      }
    });
  };

  /**
   * fires a location search from the forn
   *
   * @param event
   * @returns
   */
  updateSearchText = e => {
    e.preventDefault();
    if (!this.setState.onEnter) this.setState({ onEnter: true });
    const { searchText } = this.state;
    this.fetchGooglePlace(searchText);
  };

  /**
   * gets every typed word of the text input from the form
   *
   * @param
   * @returns
   */
  getText = e => {
    this.setState({ searchText: e.target.value, onEnter: null });
  };

  /**
   * saves a the location that was found after clicking on the save icon
   *
   * @param
   * @returns
   */
  saveLoc = () => {
    const { googleTextSearch, favLocs, favLocTable } = this.state;
    if (!favLocTable.has(googleTextSearch)) {
      favLocTable.add(googleTextSearch);
      const newFavLocTable = new Set(favLocTable);
      const newFavLocs = [...favLocs];
      newFavLocs.push(googleTextSearch);
      this.saveSessionStorage(newFavLocs, newFavLocTable);
      this.setState({ favLocs: newFavLocs, favLocTable: newFavLocTable });
    }
  };

  /**
   * fetches saved location and updates the application weather data
   *
   * @param event
   * @returns
   */
  selectedFavLoc = e => {
    e.preventDefault();
    const googleTextSearch = e.target.value;
    this.setState({
      googleTextSearch,
      searchText: googleTextSearch
    });
    this.fetchGooglePlace(googleTextSearch);
  };

  /**
   *  updates the local sessionStorage with location searches
   *
   * @param Array, Set
   * @returns
   */
  saveSessionStorage = (newFavLocs, newFavLocTable) => {
    sessionStorage.setItem('WeatherAppLoc', newFavLocs);
    sessionStorage.setItem(
      'WeatherAppLocTable',
      this.convertToArray(newFavLocTable)
    );
  };

  /**
   * converts the location 'Set' variable into an array
   * so that it is storable for the SesssionStorage variable
   *
   * @param
   * @returns
   */
  convertToArray = st => {
    const retArry = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of st) {
      retArry.push(item);
    }
    return retArry;
  };

  /**
   * makes the decision to show alerts in the area
   *
   * @param
   * @returns
   */
  showHeadline = () => {
    const { showingHeadline } = this.state;
    this.setState({ showingHeadline: !showingHeadline });
  };

  /**
   * places each half a day into one object for better
   * data management
   *
   * @param array
   * @returns array
   */
  processSevenDayPeriod = period => {
    const retAry = [];
    period.forEach((halfDay, ind, ary) => {
      if (ind === 0) return;
      if (halfDay.number % 2 === 0) {
        retAry.push({ low: halfDay, high: ary[ind - 1] });
      }
    });
    return retAry;
  };

  /**
   * display WeatherApp Component
   *
   * @param
   * @returns jsx component
   */
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
    const { children } = this.props;
    // eslint-disable-next-line react/prop-types
    const { google } = this.props;

    const initialCenter = {
      lat: 47.4444,
      lng: -122.176
    };
    const mapStyles = {
      width: '100%',
      height: '100%'
    };
    const mark = { lat, lng };
    return (
      <div className="row">
        <div className="column">
          {children}
          <div className="row bluish">
            <div className="column ">
              <div>
                <WeatherForm
                  updateSearchText={updateSearchText}
                  searchText={searchText}
                  getText={getText}
                  saveLoc={saveLoc}
                  favLocs={favLocs}
                  selectedFavLoc={selectedFavLoc}
                />
                <div className="row">
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
              </div>
            </div>
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

WeatherApp.propTypes = {
  children: PropTypes.element,
  google: PropTypes.objectOf(PropTypes.object),
  comp: PropTypes.string
};
WeatherApp.defaultProps = {
  children: null,
  google: null,
  comp: null
};
