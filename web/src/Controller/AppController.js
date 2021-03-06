import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import MyAppBarController from './MyAppBarController';
import LoginController from './LoginController';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './SearchController';
import AdminSearch from './AdminSearchController';
import Favorite from './FavoritesController';
import AdminPatient from '../Components/Admin/AdminPatient';
import AdminDoctor from '../Components/Admin/AdminDoctor';
import AdminCreateDoctor from '../Components/Admin/AdminCreateDoctor';
import Patient from '../Components/Patient';
import Profile from '../Components/Profile';
import Settings from '../Components/Settings';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#62BE87',
    },
    secondary: {
      main: '#00928C',
    },
  },
});

class App extends PureComponent {
  state = {
    patient: null,
    token: localStorage.getItem('myToken') || null,
    profile: false,
    settings: false,
    admin: localStorage.getItem('admin') === 'true'
  };

  setPatient = patient => (window.location = `/patient/${patient}`);
  setDoctor = doctor => (window.location = `/doctor/${doctor}`);
  addDoctor = () => (window.location = '/doctor/add');
  setToken = (token, admin) => {
    localStorage.setItem('admin', admin);
    localStorage.setItem('myToken', token);
    this.setState({ token, admin });
  }
  disconnect = () => {
    localStorage.removeItem('myToken');
    this.setState({ token: null });
  }
  openProfile = () => {
    this.setState({ profile: true });
    window.location = '/profile';
  }
  closeProfile = () => {
    window.history.back();
  }
  openSettings = () => {
    this.setState({ settings: true });
    window.location = '/settings';
  }
  closeSettings = () => {
    window.history.back();
  }
  render() {
    const {
      classes,
    } = this.props;
    const {
      token,
      admin
    } = this.state;
    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {token ? <BrowserRouter>
            <Switch>
              <Route path='/profile'>
                <MyAppBarController admin={admin} title='Profile'
                  disconnect={this.disconnect}
                  openProfile={this.openProfile}
                  openSettings={this.openSettings}
                  back={this.closeProfile}
                />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Profile token={token} />
                </main>
              </Route>
              <Route path='/settings'>
                <MyAppBarController admin={admin} title={i18n.t('settings')}
                  disconnect={this.disconnect}
                  openProfile={this.openProfile}
                  openSettings={this.openSettings}
                  back={this.closeSettings}
                />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Settings appController={this} />
                </main>
              </Route>
              {(admin === true) ?
                <Route path='/doctor/add' render={({_, location}) =>
                  <div style={{flexGrow:1}}>
                    <MyAppBarController admin={admin} title='Doctor'
                      disconnect={this.disconnect}
                      openProfile={this.openProfile}
                      openSettings={this.openSettings}
                      back={() => window.location = '/'}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <AdminCreateDoctor
                        token={token}
                        location={location}
                      />
                    </main>
                  </div>
                }>
                </Route>
                : null
              }
              {(admin === true) ?
                <Route path='/doctor/:id' render={({match}) =>
                  <div style={{flexGrow:1}}>
                    <MyAppBarController admin={admin} title='Doctor'
                      disconnect={this.disconnect}
                      openProfile={this.openProfile}
                      openSettings={this.openSettings}
                      back={() => window.location = '/'}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <AdminDoctor token={token} doctorID={match.params.id} />
                    </main>
                  </div>
                }>
                </Route>
                : null
              }
              <Route path='/patient/:id' render={({match}) => 
                <div style={{flexGrow:1}}>
                  <MyAppBarController admin={admin} title='Patient'
                    disconnect={this.disconnect}
                    openProfile={this.openProfile}
                    openSettings={this.openSettings}
                    back={() => window.location = '/'}
                  />
                  {
                    <main className={classes.content}>
                      <div className={classes.toolbar} id='toolbar'/>
                      {
                        (admin === true) ?
                          <AdminPatient token={token} patientID={match.params.id}/> :
                          <Patient token={token} patientID={match.params.id}/>
                      }
                    </main>
                  }
                </div>
              }/>
              <Route path='/favorite'>
                <div style={{flexGrow:1}}>
                  <MyAppBarController admin={admin} title='Favorite'
                    disconnect={this.disconnect}
                    openProfile={this.openProfile}
                    openSettings={this.openSettings}
                    back={() => window.location = '/'}
                  />
                  <main className={classes.content}>
                    <div className={classes.toolbar} id='toolbar'/>
                    <Favorite token={token} setPatient={this.setPatient} />
                  </main>
                </div>
              </Route>
              <Route path='/'>
                <MyAppBarController admin={admin} title={i18n.t('list')}
                  disconnect={this.disconnect}
                  openProfile={this.openProfile}
                  openSettings={this.openSettings}
                />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {(admin === true) ?
                    <AdminSearch token={token} setPatient={this.setPatient} setDoctor={this.setDoctor} addDoctor={this.addDoctor} /> :
                    <Search token={token} setPatient={this.setPatient} />
                  }
                </main>
              </Route>
            </Switch>
          </BrowserRouter> : <LoginController setToken={this.setToken} />
          }
        </ThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);