import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBar from './MyAppBar';
import Navigation from './Navigation';
import Main from './Main';
import Login from './Controller/LoginController';
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
    client: null,
    token: localStorage.getItem('myToken') || null,
  };

  setClient = client => this.setState({client});
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
      client,
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
          setClient={this.setClient}
        />
        <Main classes={classes} client={client} setClient={this.setClient}/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);