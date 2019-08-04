import React, { PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class MyAppBar extends PureComponent {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Patients
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MyAppBar;