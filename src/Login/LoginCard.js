import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = {
  login: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DDDDDD',
    zIndex: 10000,
  },
  loginCardContainer: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    justifyContent: 'center',
  },
  loginCard: {
    margin: 10,
    maxWidth: 600,
    width: '100%',
    justifyContent: 'right',
  },
  loginButton: {
    marginTop: 16,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 0,
  },
};

class LoginCard extends Component {
  state = {password: '', email: ''}

  setPassword = e => {
    const password = e.target.value;
    this.setState({password});
  }
  setEmail = e => {
    const email = e.target.value;
    this.setState({email});
  }
  login = async e => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if (res.status === 200) {
        const json = await res.json();
        this.props.setToken(json.token);
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      classes,
      open
    } = this.props;
    const {
      email,
      password
    } = this.state;
    return (
      <div className={classes.login} style={open ? {} : {display: 'none'}}>
        <div className={classes.loginCardContainer}>
          <Card className={classes.loginCard}>
            <CardContent>
              <Typography variant="h5">Connexion</Typography>
              <form onSubmit={this.login}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={this.setEmail}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Mot de passe"
                  value={password}
                  onChange={this.setPassword}
                  margin="normal"
                  fullWidth
                />
                <div>
                  <Button
                    className={classes.loginButton}
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={this.login}
                  >
                    Se connecter
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

LoginCard.defaulProps = {
  open: false,
};

LoginCard.propTypes = {
  classes: PropTypes.shape({
    login: PropTypes.string.isRequired,
    loginCardContainer: PropTypes.string.isRequired,
    loginCard: PropTypes.string.isRequired,
    loginButton: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginCard);