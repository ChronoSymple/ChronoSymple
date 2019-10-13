import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar, PatientList } from '../Components/Search';
//import Api from '../Api';
import Request from '../Components/Request';
import Chip from '@material-ui/core/Chip';
import diseases from '../diseases';

const data = [
  {id: 1, firstname: 'Carl', lastname: 'DE GENTILE', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {
    diabetes: [
      { date: '20/10', data: 20 },
      { date: '21/10', data: 14 },
      { date: '22/10', data: 15 },
      { date: '23/10', data: 12 },
      { date: '24/10', data: 19 },
      { date: '25/10', data: 17 },
      { date: '26/10', data: 14 },
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
];

class SearchController extends PureComponent {
  
  state = {
    search: '',
    data: [],
    error: null,
    init: false,
    selected: JSON.parse(localStorage.getItem('diseases') || '{}')
  };
  setSearchValue = search => this.setState({ search });

  filterData = data => {
    const words = this.state.search.split(' ');
    let filtered = data.filter(e => words.map(s =>
      e.firstname.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
      e.lastname.toLocaleLowerCase().includes(s.toLocaleLowerCase())
    ).reduce((p, c) => p && c, true));
    Object.keys(this.state.selected).forEach(key => {
      if (this.state.selected[key] === true) {
        filtered = filtered.filter(e => e.diseases[key] !== undefined);
      }
    });
    return filtered;
  };

  componentDidMount() {
    this.init();
  }

  init = async() => {
    return this.setState({init: true, data});
    // TODO: Remove fake data
    /*
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
    */
  }

  chipClick = disease => {
    this.setState(state => ({selected: {
      ...state.selected,
      [disease]: !state.selected[disease]
    }}));
  }

  setPatient = patient => this.props.setPatient({patient, selected : this.state.selected});

  render() {
    const {
      search,
      data,
      error,
      init
    } = this.state;
    const filterData = this.filterData(data);
    return (
      <div>
        <SearchBar search={search} setSearchValue={this.setSearchValue}/>
        <br/>
        {
          Object.keys(diseases).map(disease => <Chip
            key={diseases[disease].fullName}
            color={this.state.selected[disease] ? 'primary' : 'default'}
            label={diseases[disease].fullName}
            onClick={() => this.chipClick(disease)}/>)
        }
        <Request error={error} loading={!init}>
          <PatientList data={filterData} setPatient={this.setPatient}/>
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
