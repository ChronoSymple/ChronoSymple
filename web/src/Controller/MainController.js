import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Search from './SearchController';
import Patient from '../Components/Patient';

class MainController extends PureComponent {

  render() {
    const {
      classes,
      client,
      setClient,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {client ? <Patient client={client}/> : <Search setClient={setClient}/>}
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
  client: PropTypes.object,
  setClient: PropTypes.func.isRequired,
};

export default MainController;