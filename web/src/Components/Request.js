import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const Request = ({
  children,
  loading,
  error,
  classes
}) => {
  if (error) {
    return <div className={classes.progress}>{error.toString()}</div>;
  } else if (loading === true) {
    return <div className={classes.progress}><CircularProgress/></div>;
  }
  if (children)
    return children;
  return null;
};

Request.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  classes: PropTypes.shape({
    progress: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Request);