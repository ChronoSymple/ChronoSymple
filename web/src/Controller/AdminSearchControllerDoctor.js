import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from '../Components/Search';
import AdminDoctorList from '../Components/Admin/AdminDoctorList';
import Api from '../Api';
import Request from '../Components/Request';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/*
const data = [
  {id: 1, firstname: 'Henry', lastname: 'MARTIN', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {
  }},
];
*/

class AdminSearchController extends PureComponent {

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
      const rawdata = await Api.getDoctorsAsAdmin(this.props.token);
      const data = rawdata.map(e => {
        const {first_name: firstname, last_name: lastname, ...others} = e.user;
        const id = e.id;
        return {...others, firstname, lastname, id};
      });
      this.setState({init: true, data});
    } catch (e) {
      this.setState({error : e.message});
    }
  }

  deleteDoctor = async id => {
    try {
      await Api.deleteDoctor(this.props.token, id);
    }
    catch (e) {
      //console.error(e);
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
          <div style={{paddingBottom: 72}}>
            <AdminDoctorList data={filterData} setDoctor={this.props.setDoctor} deleteDoctor={this.deleteDoctor}/>
          </div>
        </Request>
        <Fab color="secondary" style={{position: 'fixed', right: 20, bottom: 20}} onClick={this.props.addDoctor}>
          <AddIcon/>
        </Fab>
      </div>
    );
  }
}

AdminSearchController.propTypes = {
  setDoctor: PropTypes.func.isRequired,
  addDoctor: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default AdminSearchController;
