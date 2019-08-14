import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
};

class MyAppBar extends PureComponent {

  render() {
    const {
      classes,
      openProfile,
      disconnect,
      openMenu,
      closeMenu,
      anchorEl
    } = this.props;
    const open = anchorEl !== null;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.root}>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              Patients
            </Typography>
            <IconButton
              onClick={openMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={closeMenu}
            >
              <MenuItem onClick={openProfile}>Profile</MenuItem>
              <MenuItem onClick={disconnect}>Disconnect</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MyAppBar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  disconnect: PropTypes.func.isRequired,
  openProfile: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.string.isRequired
};
export default withStyles(styles)(MyAppBar);