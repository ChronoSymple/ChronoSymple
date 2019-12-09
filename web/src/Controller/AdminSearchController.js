import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper, Toolbar } from '@material-ui/core';
import AdminSearchControllerPatient from './AdminSearchControllerPatient';
import AdminSearchControllerDoctor from './AdminSearchControllerDoctor';

class AdminSearchController extends PureComponent {
  state = {value: 0}
  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };
  render() {
    const {
      token,
      setPatient,
      setDoctor
    } = this.props;
    return (<div>
      <div style={{position: 'fixed', top:0, left: 0, right:0, zIndex:60}}>
        <Toolbar/>
        <Paper square>
          <Tabs value={this.state.value} variant="fullWidth" onChange={this.handleChange}>
            <Tab label='Patient'/>
            <Tab label='Doctor'/>
          </Tabs>
        </Paper>
      </div>
      <br/>
      <br/>
      { (this.state.value === 0) ?
        <AdminSearchControllerPatient token={token} setPatient={setPatient}/> :
        <AdminSearchControllerDoctor token={token} setDoctor={setDoctor}/>
      }
    </div>
    );
  }
}

AdminSearchController.propTypes = {
  setDoctor: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default AdminSearchController;