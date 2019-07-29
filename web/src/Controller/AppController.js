import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBar from '../Components/MyAppBar';
import Navigation from '../Components/Navigation';
import Main from './MainController';
import Login from './LoginController';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class App extends PureComponent {
  state = {
    mobileOpen: false,
    patient: null,
    token: localStorage.getItem('myToken') || null,
  };

  setPatient = patient => this.setState({patient});
  setToken = token => {
    localStorage.setItem('myToken', token);
    this.setState({token});
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      patient,
      mobileOpen,
      token
    } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        {token ? null : <Login setToken={this.setToken}/>}
        <MyAppBar classes={classes} handleDrawerToggle={this.handleDrawerToggle}/>
        <Navigation
          classes={classes}
          mobileOpen={mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
          setPatient={this.setPatient}
        />
        {token ? <Main classes={classes} token={token} patient={patient} setPatient={this.setPatient}/> : null}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);