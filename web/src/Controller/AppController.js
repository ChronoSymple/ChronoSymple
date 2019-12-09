import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBarController from './MyAppBarController';
import Main from './MainController';
import LoginController from './LoginController';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class App extends PureComponent {
  state = {
    patient: null,
    token: localStorage.getItem('myToken') || null,
    profile: false
  };

  setPatient = patient => this.setState({patient});
  setDoctor = doctor => this.setState({doctor});
  closePatient = () => this.setState({patient: null});
  closeDoctor = () => this.setState({doctor: null});
  setToken = token => {
    localStorage.setItem('myToken', token);
    this.setState({token});
  }
  disconnect = () => {
    localStorage.removeItem('myToken');
    this.setState({token: null});
  }
  openProfile = () => {
    this.setState({profile: true});
  }
  closeProfile = () => {
    this.setState({profile: false});
  }
  render() {
    const {
      classes,
    } = this.props;
    const {
      patient,
      token,
      profile,
      doctor
    } = this.state;
    let title = 'Liste';
    if (patient)
      title = 'Patient';
    if (doctor)
      title = 'Doctor';
    if (profile)
      title = 'Profile';
    const admin = localStorage.getItem('admin') === 'true';
    return (
      <div className={classes.root}>
        <CssBaseline />
        {token ? null : <LoginController setToken={this.setToken}/>}
        <MyAppBarController title={title}
          admin={admin}
          disconnect={this.disconnect}
          openProfile={this.openProfile}
          closeProfile={this.closeProfile}
          closePatient={this.closePatient}
          closeDoctor={this.closeDoctor}/>
        {token ? <Main classes={classes} token={token} doctor={doctor} patient={patient} setDoctor={this.setDoctor} setPatient={this.setPatient} profile={profile} admin={admin}/> : null}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);