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
  closePatient = () => this.setState({patient: null});
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
      profile
    } = this.state;
    let title = 'Patients';
    if (patient)
      title = 'Patient';
    if (profile)
      title = 'Profile';
    return (
      <div className={classes.root}>
        <CssBaseline />
        {token ? null : <LoginController setToken={this.setToken}/>}
        <MyAppBarController title={title} disconnect={this.disconnect} openProfile={this.openProfile} closeProfile={this.closeProfile} closePatient={this.closePatient}/>
        {token ? <Main classes={classes} token={token} patient={patient} setPatient={this.setPatient} profile={profile}/> : null}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);