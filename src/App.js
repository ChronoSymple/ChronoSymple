import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBar from './MyAppBar';
import Navigation from './Navigation';
import Main from './Main';
import Login from './Login';
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

class App extends React.Component {
  state = {
    mobileOpen: false,
    client: null,
    login: false,
  };

  setClient = (client) => this.setState({ client });

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
    } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Login/>
        <MyAppBar classes={classes} handleDrawerToggle={this.handleDrawerToggle}/>
        <Navigation
          classes={classes}
          mobileOpen={mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
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