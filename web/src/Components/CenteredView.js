import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  login: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DDDDDD',
    zIndex: 1000,
    overflow: 'scroll'
  },
  horizontalCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  verticalCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100%',
  },
};


class CenteredView extends PureComponent {
  render() {
    const {
      children,
      classes,
    } = this.props;
    return (<div className={classes.login}>
      <div className={classes.verticalCenter}>
        <div className={classes.horizontalCenter}>
          {children}
        </div>
      </div>
    </div>);
  }
}

CenteredView.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.shape({
    login: PropTypes.string.isRequired,
    verticalCenter: PropTypes.string.isRequired,
    horizontalCenter: PropTypes.string.isRequired,
  }).isRequired
};


export default withStyles(styles)(CenteredView);
