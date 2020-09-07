import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  background: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DDDDDD',
    zIndex: 5000,
    overflow: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  horizontalCenter: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10
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
    return (<div className={classes.background} style={{
      color: 'red',
      backgroundImage: `url(${this.props.image})`
    }}>
      <div className={classes.verticalCenter} >
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
    background: PropTypes.string.isRequired,
    verticalCenter: PropTypes.string.isRequired,
    horizontalCenter: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string
};


export default withStyles(styles)(CenteredView);
