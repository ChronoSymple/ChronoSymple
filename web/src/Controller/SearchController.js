import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar, PatientList } from '../Components/Search';
import Api from '../Api';
import Request from '../Components/Request';

class SearchController extends PureComponent {
  
  state = { search: '', data: [], error: null, init: false };

  setSearchValue = search => this.setState({ search });

  filterData = data => {
    const words = this.state.search.split(' ');
    return data.filter(e => words.map(s =>
      e.firstname.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
      e.lastname.toLocaleLowerCase().includes(s.toLocaleLowerCase())
    ).reduce((p, c) => p && c, true));
  };

  componentDidMount() {
    this.init();
  }

  init = async() => {
    try {
      const rawdata = await Api.getPatients(this.props.token);
      const data = rawdata.map(e => {
        const {first_name, last_name, ...others} = e.user;
        return {...others, firstname: first_name, lastname: last_name};
      })
      this.setState({init: true, data});
    } catch (e) {
      this.setState({error : e.message});
    }
  }

  render() {
    const {
      search,
      data,
      error,
      init
    } = this.state;
    const {
      setClient
    } = this.props;
    const filterData = this.filterData(data);
    return (
      <div>
        <SearchBar search={search} setSearchValue={this.setSearchValue}/>
        <Request error={error} loading={!init}>
          <PatientList data={filterData} setClient={setClient}/>
        </Request>
      </div>
    );
  }
}

SearchController.propTypes = {
  setClient: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default SearchController;
