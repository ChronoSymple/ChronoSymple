import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import Search from './Search/';
import Search from './Patient/';

export default class Main extends PureComponent {
  render() {
    const {
      classes,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Search/>
      </main>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
  }).isRequired
};