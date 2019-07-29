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
  childrens,
  loading,
  error,
  classes
}) => {
  if (error) {
    return <div className={classes.progress}>{error}</div>;
  } else if (loading === true) {
    return <div className={classes.progress}><CircularProgress/></div>;
  }
  return childrens;
};

Request.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool
};

export default withStyles(styles)(Request);