import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBarController from './MyAppBarController';
import Main from './MainController';
import LoginController from './LoginController';
import { withStyles } from '@material-ui/core/styles';
import i18n from 'i18next';

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
    profile: false,
    settings: false
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
  openSettings = () => {
    this.setState({settings: true});
  }
  closeSettings = () => {
    this.setState({settings: false});
  }
  render() {
    const {
      classes,
    } = this.props;
    const {
      patient,
      token,
      profile,
      settings,
      doctor
    } = this.state;
    let title = i18n.t("list");
    if (patient)
      title = 'Patient';
    if (doctor)
      title = 'Doctor';
    if (profile)
      title = 'Profile';
    if (settings)
      title = i18n.t("settings");
    const admin = localStorage.getItem('admin') === 'true';
    return (
      <div className={classes.root}>
        <CssBaseline />
        {token ? null : <LoginController setToken={this.setToken}/>}
        <MyAppBarController title={title}
          admin={admin}
          disconnect={this.disconnect}
          openProfile={this.openProfile}
          openSettings={this.openSettings}
          closeSettings={this.closeSettings}
          closeProfile={this.closeProfile}
          closePatient={this.closePatient}
          closeDoctor={this.closeDoctor}/>
        {token ? <Main classes={classes} token={token} doctor={doctor} patient={patient} setDoctor={this.setDoctor} setPatient={this.setPatient} profile={profile} admin={admin} settings={settings} appController={this}/> : null}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);