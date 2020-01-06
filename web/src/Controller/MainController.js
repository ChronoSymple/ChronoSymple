import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Search from './SearchController';
import AdminSearch from './AdminSearchController';
import AdminPatient from '../Components/Admin/AdminPatient';
import AdminDoctor from '../Components/Admin/AdminDoctor';
import Patient from '../Components/Patient';
import Profile from '../Components/Profile';
class MainController extends PureComponent {

  render() {
    const {
      classes,
      patient,
      doctor,
      setPatient,
      setDoctor,
      token,
      profile,
      admin
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {(() => {
          if (profile) {
            return <Profile token={token}/>;
          } else if (patient) {
            if (admin === true) {
              return <AdminPatient token={token} client={patient}/>;
            }
            return <Patient token={token} client={patient}/>;
          } else if (doctor && admin) {
            return <AdminDoctor token={token} doctor={doctor}/>;
          } else {
            if (admin === true) {
              return <AdminSearch token={token} setPatient={setPatient} setDoctor={setDoctor}/>;
            }
            return <Search token={token} setPatient={setPatient}/>;
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
  doctor: PropTypes.object,
  setPatient: PropTypes.func.isRequired,
  setDoctor: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  profile: PropTypes.bool.isRequired,
  admin: PropTypes.bool
};

export default MainController;