import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';

const MyDrawer = ({classes, setPatient}) => (
  <div>
    <div className={classes.toolbar} />
    <Divider />
    <List>
      {['Patient'].map(text => (
        <ListItem button key={text} onClick={setPatient}>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

MyDrawer.propTypes = {
  setPatient: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    toolbar: PropTypes.string
  })
};

class Navigation extends PureComponent {
  render() {
    const {
      classes,
      mobileOpen,
      handleDrawerToggle,
      setPatient
    } = this.props;
    

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <MyDrawer classes={classes} setPatient={setPatient}/>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <MyDrawer classes={classes} setPatient={setPatient}/>
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

Navigation.defaultProps = {
  mobileOpen: false
};

Navigation.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string.isRequired,
    drawer: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
  }).isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired
};

export default Navigation;