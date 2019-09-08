import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBarController from './MyAppBarController';
import Main from './MainController';
import Login from './LoginController';
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
  };

  setPatient = patient => this.setState({patient});
  setToken = token => {
    localStorage.setItem('myToken', token);
    this.setState({token});
  }
  disconnect = () => {
    localStorage.removeItem('myToken');
    this.setState({token: null});
  }
  openProfile = () => {}
  render() {
    const {
      classes,
    } = this.props;
    const {
      patient,
      token
    } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        {token ? null : <Login setToken={this.setToken}/>}
        <MyAppBarController title="Patients" disconnect={this.disconnect} openProfile={this.openProfile}/>
        {token ? <Main classes={classes} token={token} patient={patient} setPatient={this.setPatient}/> : null}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);