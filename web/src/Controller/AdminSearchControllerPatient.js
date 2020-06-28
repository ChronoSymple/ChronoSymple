import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from '../Components/Search';
import AdminPatientList from '../Components/Admin/AdminPatientList';
import Api from '../Api';
import Request from '../Components/Request';

/*
const data = [
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
];
*/

class AdminSearchControllerPatient extends PureComponent {
  
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
    return filtered;
  };

  componentDidMount() {
    this.init();
  }

  init = async() => {
    //return this.setState({init: true, data});
    // TODO: Remove fake data
    try {
      const rawdata = await Api.getPatientsAsAdmin(this.props.token);
      const data = rawdata.filter(e => e !== null).map(e => {
        const {first_name: firstname, last_name: lastname, ...others} = e;
        return {...others, firstname, lastname};
      });
      this.setState({init: true, data});
    } catch (e) {
      this.setState({error : e.message});
    }
  }


  setPatient = patient => this.props.setPatient(patient.id);

  deletePatient = async id => {
    try {
      await Api.deletePatient(this.props.token, id);
    } catch (err) {
      console.error(err);
    }
  }

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
        <Request error={error} loading={!init}>
          <AdminPatientList data={filterData} setPatient={this.setPatient} deletePatient={this.deletePatient}/>
        </Request>
      </div>
    );
  }
}

AdminSearchControllerPatient.propTypes = {
  setPatient: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default AdminSearchControllerPatient;
