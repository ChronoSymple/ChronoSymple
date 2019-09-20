import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar, PatientList } from '../Components/Search';
import Api from '../Api';
import Request from '../Components/Request';
import Chip from '@material-ui/core/Chip';

const diseases = ['Diabète', 'Cancer'];
class SearchController extends PureComponent {
  
  state = { search: '', data: [], error: null, init: false, selected: {} };

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
      });
      this.setState({init: true, data});
    } catch (e) {
      this.setState({error : e.message});
    }
  }

  chipClick = e => {
    const disease = e.target.innerText;
    this.setState(state => ({selected: {
      ...state.selected,
      [disease]: !state.selected[disease]
    }}));
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
        <br/>
        {
          diseases.map(disease => <Chip
            key={disease}
            color={this.state.selected[disease] ? 'primary' : 'default'}
            label={disease}
            onClick={this.chipClick}/>)
        }
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
