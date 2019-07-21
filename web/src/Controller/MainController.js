import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Search from './SearchController';
import Patient from '../Components/Patient';

class MainController extends PureComponent {

  render() {
    const {
      classes,
      patient,
      setPatient,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {patient ? <Patient client={patient}/> : <Search setClient={setPatient}/>}
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
};

export default MainController;