import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class MyAppBar extends PureComponent {
  render() {
    const {
      classes,
      handleDrawerToggle,
    } = this.props;
    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Patients
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

MyAppBar.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
  }).isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default MyAppBar;