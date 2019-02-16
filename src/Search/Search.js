import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PatientList from './PatientList';
import SearchBar from './Searchbar';

const fakedata = [
  {id: 1, firstname: 'Carl', lastname: 'DE GENTILE', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: [{
    name: 'diabetes',
    data: [
      { date: '20/10', data: 20 },
      { date: '21/10', data: 14 },
      { date: '22/10', data: 15 },
      { date: '23/10', data: 12 },
      { date: '24/10', data: 19 },
      { date: '25/10', data: 17 },
      { date: '26/10', data: 14 },
    ]
  }]},
  {id: 2, firstname: 'Marie-Aimée', lastname: 'FOURTANE', birthdate: 'XX/XX/XXXX', civility: 'Mme', diseases: []},
  {id: 3, firstname: 'Alexandre', lastname: 'CAILA', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: []},
  {id: 4, firstname: 'Victor', lastname: 'ZHU', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: []},
  {id: 5, firstname: 'Robin', lastname: 'MILAS', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: [{
    name: 'Test',
    data: 2
  }]},
  {id: 6, firstname: 'Laura', lastname: 'PEREIRA', birthdate: 'XX/XX/XXXX', civility: 'Mme', diseases: []}
];

class Search extends Component {
  
  state = { search: '' };

  setSearchValue = search => this.setState({ search });

  render() {
    const {
      search,
    } = this.state;
    const {
      setClient
    } = this.props;
    const searches = search.split(' ');
    const data = fakedata.filter(e => searches.map(s =>
      e.firstname.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
      e.lastname.toLocaleLowerCase().includes(s.toLocaleLowerCase())
    ).reduce((p, c) => p && c, true));
    return (
      <div>
        <SearchBar search={search} setSearchValue={this.setSearchValue}/>
        <PatientList data={data} setClient={setClient}/>
      </div>
    );
  }
}

Search.propTypes = {
  setClient: PropTypes.func.isRequired,
};

export default Search;
