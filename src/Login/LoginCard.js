import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = {
  login: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#DDDDDD",
    zIndex: 10000,
  }
}

class LoginCard extends Component {
  render() {
    const {
      classes
    } = this.props;
    return (
    <div className={classes.login}>
        <Card>
          <CardContent>
            <Typography variant="h5">Connexion</Typography>
            <TextField
              label="Email"
              //value={this.state.name}
              //onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Mot de passe"
              //value={this.state.name}
              //onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
            />
            <Button color="primary" variant="contained">Se connecter</Button>
          </CardContent>
        </Card>
    </div>
    );
  }
}

LoginCard.defaultProps = {
};

export default withStyles(styles)(LoginCard);