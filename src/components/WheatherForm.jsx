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
import Zipcode from './ZipCode';
import Address from './Address';

export default class WheatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      onEnter: null
    };
  }

  updateSearchText = e => {
    e.preventDefault();
    console.log('target', e.target);
    // this.setState((state, props) => ({ searchText: e.target.input.value }));

    if (!this.setState.onEnter) this.setState({ onEnter: true });
  };

  getText = e => {
    // e.preventDefault();
    console.log('e.target.value', e.target.value);
    // if (this.state.onEnter === true)
    this.setState({ searchText: e.target.value, onEnter: null });
  };

  render() {
    const { updateSearchText, getText } = this;
    const { searchText } = this.state;
    console.log('enter', this.state.onEnter);

    const googleTextSearch =
      this.state.onEnter === null ? '' : this.state.searchText;
    console.log(
      'searchTExt: ',
      searchText,
      ' googleTextSearch: ',
      googleTextSearch
    );
    return (
      <div>
        <form onSubmit={updateSearchText}>
          <Address
            searchText={searchText}
            getText={getText}
            googleTextSearch={googleTextSearch}
          />
          <Zipcode />
          <FavList />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
