import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Search from './SearchController';
import Patient from '../Components/Patient';
import Profile from '../Components/Profile';
class MainController extends PureComponent {

  render() {
    const {
      classes,
      patient,
      setPatient,
      token,
      profile
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {(() => {
          if (profile) {
            return <Profile/>
          } else if (patient) {
            return <Patient client={patient}/>
          } else { 
            return <Search token={token} setClient={setPatient}/>
          } 
        })()}
      </main>
    );
  }
}

MainController.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
  }).isRequired,
  // TODO: Improve object form
  patient: PropTypes.object,
  setPatient: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  profile: PropTypes.bool.isRequired
};

export default MainController;