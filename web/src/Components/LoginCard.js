import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core';

const styles = {
  loginCard: {
    margin: 10,
    maxWidth: 600,
    width: '100%',
    justifyContent: 'right',
  },
  loginButton: {
    margin: 8
  },
};

const LoginCard = ({
  classes,
  email,
  password,
  setEmail,
  setPassword,
  login,
  openRegister,
  error
}) => (
  <div>
    <AppBar>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}} />
        <a href='https://eip.epitech.eu/2021/chronosymple/'>
          <Button style={{margin: 6}} color="default" variant="outlined" >Qui sommes nous?</Button>
        </a>
      </div>
    </AppBar>
    <Card className={classes.loginCard}>
      <CardContent>
        <Typography variant="h5">Connexion</Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={login}>
          <TextField
            label="Email"
            value={email}
            onChange={setEmail}
            margin="normal"
            fullWidth
            type="email"
          />
          <TextField
            label="Mot de passe"
            value={password}
            onChange={setPassword}
            margin="normal"
            type="password"
            fullWidth
          />
          <div style={{display: 'flex'}}>
            <div style={{flex: 1}}/>
            <Button
              className={classes.loginButton}
              color="primary"
              onClick={openRegister}
            >
              {'S\'inscrire'}
            </Button>
            <Button
              className={classes.loginButton}
              type="submit"
              color="primary"
              variant="contained"
              onClick={login}
            >
              Se connecter
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);

LoginCard.propTypes = {
  classes: PropTypes.shape({
    loginCard: PropTypes.string.isRequired,
    loginButton: PropTypes.string.isRequired,
  }),
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginCard);