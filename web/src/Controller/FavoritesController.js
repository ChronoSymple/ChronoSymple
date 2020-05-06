import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar, PatientList } from '../Components/Search';
import Api from '../Api';
import Request from '../Components/Request';
import Chip from '@material-ui/core/Chip';
import diseases from '../diseases';
import FilterIcon from '@material-ui/icons/FilterList';
import { Button } from '@material-ui/core';

class FavoriteController extends PureComponent {
  
  state = {
    search: '',
    data: [],
    error: null,
    init: false,
    selected: JSON.parse(localStorage.getItem('diseases') || '{}'),
    filtersOn: false,
  };
  setSearchValue = search => this.setState({ search });

  filterData = (data, filterOn) => {
    console.log(data);

    const words = this.state.search.split(' ');
    let filtered = data.filter(e => JSON.parse(localStorage.getItem('favorites') || '[]').includes(e.id)).filter(e => words.map(s =>
      e.firstname.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
      e.lastname.toLocaleLowerCase().includes(s.toLocaleLowerCase())
    ).reduce((p, c) => p && c, true));
    if (filterOn) {
      Object.keys(this.state.selected).forEach(key => {
        if (this.state.selected[key] === true) {
          filtered = filtered.filter(e => e.diseases && e.diseases[key] !== undefined);
        }
      });
    }
    return filtered;
  };

  componentDidMount() {
    localStorage.setItem('selectedDiseases', JSON.stringify(this.state.selected));
    this.init();
  }

  init = async() => {
    //return this.setState({init: true, data});
    try {
      const rawdata = await Api.getPatients(this.props.token);
      const data = await Promise.all(rawdata.map(e => e.patient_id).reduce((c, e) => c.includes(e) ? c : [...c, e], []).map(async id => {
        const patientData = await Api.getPatient(this.props.token, id);
        const {first_name: firstname, last_name: lastname, ...others} = patientData;
        return {...others, firstname, lastname, id};
      }));
      this.setState({init: true, data});
    } catch (e) {
      this.setState({error : e.message});
    }
  }

  chipClick = disease => {
    this.setState(state => ({selected: {
      ...state.selected,
      [disease]: !state.selected[disease]
    }}), () => localStorage.setItem('selectedDiseases', JSON.stringify(this.state.selected)));
  }

  deletePatient = e => {
    e.stopPropagation();
    return false;
  }

  toogleFilters = () => this.setState(({filtersOn}) => ({filtersOn: !filtersOn}));

  favorite = () => (window.location = '/favorite');

  render() {
    const {
      search,
      data,
      error,
      init,
      filtersOn,
    } = this.state;
    const filterData = this.filterData(data, filtersOn);
    return (
      <div>
        <SearchBar search={search} setSearchValue={this.setSearchValue}/>
        <br/>
        <div>
          <Button variant='outlined' size='small' onClick={this.toogleFilters} style={{color: filtersOn ? 'black'  : 'gray'}}><FilterIcon/>Filters</Button>
        </div>
        {
          filtersOn && [<br key='none'/>, ...Object.keys(diseases).map(disease => <Chip
            key={diseases[disease].fullName}
            color={this.state.selected[disease] ? 'primary' : 'default'}
            label={diseases[disease].fullName}
            onClick={() => this.chipClick(disease)}/>)]
        }
        <Request error={error} loading={!init}>
          <PatientList data={filterData} setPatient={this.props.setPatient} deletePatient={this.deletePatient}/>
        </Request>
      </div>
    );
  }
}

FavoriteController.propTypes = {
  setPatient: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default FavoriteController;
