import React from 'react';
import PropTypes from 'prop-types';
import PatientList from './PatientList';
import SearchBar from './Searchbar';
import exact from 'prop-types-exact';

const Search = ({
  search,
  setClient,
  data,
  setSearchValue
}) => (
  <div>
    <SearchBar search={search} setSearchValue={setSearchValue}/>
    <PatientList data={data} setClient={setClient}/>
  </div>
);

Search.propTypes = exact({
  search: PropTypes.string.isRequired,
  setClient: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    civility: PropTypes.oneOf(['Mr', 'Mme']),
    diseases: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.any.isRequired
    })).isRequired
  })).isRequired,
  setSearchValue: PropTypes.func.isRequired
});

export default Search;
