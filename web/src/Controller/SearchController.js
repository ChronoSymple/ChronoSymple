import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar, PatientList } from '../Components/Search';
import Api from '../Api';
import Request from '../Components/Request';
import Chip from '@material-ui/core/Chip';
import diseases from '../diseases';
import FilterIcon from '@material-ui/icons/FilterList';
import { Button } from '@material-ui/core';
import i18n from 'i18next';

/*const data = [
  {id: 1, firstname: 'Carl', lastname: 'DE GENTILE', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {
    diabetes: [
      { date: new Date('2019-10-20T09:00:00Z'), data: 80 },
      { date: new Date('2019-10-20T12:00:00Z'), data: 90 },
      { date: new Date('2019-10-20T13:00:00Z'), data: 135 },
      { date: new Date('2019-10-20T20:00:00Z'), data: 100 },
      { date: new Date('2019-10-21T09:00:00Z'), data: 65 },
      { date: new Date('2019-10-21T12:00:00Z'), data: 74 },
      { date: new Date('2019-10-21T20:00:00Z'), data: 85 },
      { date: new Date('2019-10-22T09:00:00Z'), data: 97 },
      { date: new Date('2019-10-22T12:00:00Z'), data: 95 },
      { date: new Date('2019-10-22T20:00:00Z'), data: 71 },
      { date: new Date('2019-10-23T09:00:00Z'), data: 93 },
      { date: new Date('2019-10-23T12:00:00Z'), data: 81 },
      { date: new Date('2019-10-23T20:00:00Z'), data: 73 },
      { date: new Date('2019-10-24T09:00:00Z'), data: 96 },
      { date: new Date('2019-10-24T12:00:00Z'), data: 71 },
      { date: new Date('2019-10-24T20:00:00Z'), data: 76 },
      { date: new Date('2019-10-25T09:00:00Z'), data: 94 },
      { date: new Date('2019-10-25T12:00:00Z'), data: 97 },
      { date: new Date('2019-10-25T20:00:00Z'), data: 88 },
      { date: new Date('2019-10-26T09:00:00Z'), data: 55 },
      { date: new Date('2019-10-26T12:00:00Z'), data: 78 },
      { date: new Date('2019-10-26T20:00:00Z'), data: 90 },
    ]
  }},
  {id: 2, firstname: 'Marie-Aimée', lastname: 'FOURTANE', birthdate: 'XX/XX/XXXX', civility: 'Mme', diseases: {}},
  {id: 3, firstname: 'Alexandre', lastname: 'CAILA', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {}},
  {id: 4, firstname: 'Victor', lastname: 'ZHU', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {}},
  {id: 5, firstname: 'Robin', lastname: 'MILAS', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {
    test: 2
  }},
  {id: 6, firstname: 'Laura', lastname: 'PEREIRA', birthdate: 'XX/XX/XXXX', civility: 'Mme', diseases: {}},
  {id: 7, firstname: 'Mohamed', lastname: 'BELKACEM', birthdate: '20/04/1997', civility:'Mr', diseases: {
    cancer: 3
  }},
];*/

class SearchController extends PureComponent {
  
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
    const words = this.state.search.split(' ');
    let filtered = data.filter(e => words.map(s =>
      e.firstname.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
      e.lastname.toLocaleLowerCase().includes(s.toLocaleLowerCase())
    ).reduce((p, c) => p && c, true));
    if (filterOn) {
      Object.keys(this.state.selected).forEach(key => {
        if (this.state.selected[key] === true) {
          filtered = filtered.filter(e => e && e.units && e.units.includes && e.units.includes(key));
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
      let d = rawdata.map(e => ({ id: e.patient_id, unit: e.general_unit.name}));
      const obj = (d.reduce((c, e) => {
        const units = c[e.id] || [];
        c[e.id] = [...units, e.unit];
        return c;
      }, {}));
      const d2 = Object.keys(obj).reduce((c, k) => [...c, { id: k, units: obj[k]}], []);
      const data = await Promise.all(d2.map(async({id, units}) => {
        const patientData = await Api.getPatient(this.props.token, id);
        const {first_name: firstname, last_name: lastname, ...others} = patientData;
        return {...others, firstname, lastname, units, id};
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
          <Button variant='outlined' size='small' onClick={this.toogleFilters} style={{color: filtersOn ? 'black'  : 'gray'}}><FilterIcon/>{i18n.t('filters')}</Button>
          {/* <Button variant='outlined' size='small' style={{ color: '#ef6b83' }} onClick={this.favorite}><FavoriteIcon/>Favorite</Button> */}
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

SearchController.propTypes = {
  setPatient: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default SearchController;
