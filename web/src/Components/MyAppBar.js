import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ContactUs from './Contact/ContactUs';
import i18n from 'i18next';

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
      openSettings,
      disconnect,
      openMenu,
      closeMenu,
      anchorEl,
      title,
      back
    } = this.props;
    const open = anchorEl !== null;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.root} style={{ background: '#62BE87' }}>
            {back && <IconButton onClick={back} color=" "><ArrowBack/></IconButton>}
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              {title}
            </Typography>
            <ContactUs/>
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
              <MenuItem onClick={openProfile}>{i18n.t('profile')}</MenuItem>
              <MenuItem onClick={disconnect}>{i18n.t('disconnect')}</MenuItem>
              <MenuItem onClick={openSettings}>{i18n.t('settings')}</MenuItem>
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
  openSettings: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.string.isRequired,
  back: PropTypes.func
};
export default withStyles(styles)(MyAppBar);