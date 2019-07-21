import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import exact from 'prop-types-exact';

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

const LoginCard = ({
  classes,
  email,
  password,
  setEmail,
  setPassword,
  login
}) => (
  <div className={classes.login}>
    <div className={classes.loginCardContainer}>
      <Card className={classes.loginCard}>
        <CardContent>
          <Typography variant="h5">Connexion</Typography>
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
            <div>
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
  </div>
);

LoginCard.propTypes = exact({
  classes: PropTypes.shape({
    login: PropTypes.string.isRequired,
    loginCardContainer: PropTypes.string.isRequired,
    loginCard: PropTypes.string.isRequired,
    loginButton: PropTypes.string.isRequired,
  }),
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
});

export default withStyles(styles)(LoginCard);