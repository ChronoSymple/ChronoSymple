import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import diseases from '../diseases';
import { withStyles, Divider, Button, TextField } from '@material-ui/core';
import gecko from '../assets/Img/Gecko.png';

const classes = theme => ({
  container: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  contentLeft: {
    textAlign: 'center',
  },
  contentSeparator: {
    margin: 20,
    border: '#DDD 0.5px solid',
  },
  contentRight: {
    width:'100%',
  },
  contentImage: {
    width: 200,
    height: 200,
    margin: 'auto',
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: JSON.parse(localStorage.getItem('diseases') || '{}')
    };
  }
  chipClick = disease => {
    this.setState(state => {
      const selected = { ...state.selected, [disease]: !state.selected[disease] };
      localStorage.setItem('diseases', JSON.stringify(selected));
      return ({ selected });
    });
  }
  render() {
    const {
      classes
    } = this.props;
    return (<Card>
      <CardContent>
        <Typography variant="h4">Profile</Typography>
        <Divider />
        <div className={classes.container}>
          <div className={classes.contentLeft}>
            <div className={classes.contentImage}>
              <img src={gecko} width="200" height="200" alt="profilePicture" />
            </div>
            <Button color='primary'>Changer de photo de profile</Button>
          </div>
          <div className={classes.contentSeparator}></div>
          <div className={classes.contentRight}>
            <Typography variant="h5">
              {'Mr. Test Doctor'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {'Spécialités: Admin'}
            </Typography>
            <div>
              {
                Object.keys(diseases).map(key => <Chip
                  key={key}
                  color={this.state.selected[key] ? 'primary' : 'default'}
                  label={diseases[key].fullName}
                  onClick={() => this.chipClick(key)} />)
              }
            </div>
            <br />
            <TextField fullWidth label="Mot de passe"/>
            <TextField fullWidth label="Email"/>
            <br/><br/>
            <Button variant='contained' color="primary">Modifiez</Button>
          </div>
        </div>
      </CardContent>
    </Card>);
  }
}

Profile.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    contentLeft: PropTypes.string.isRequired,
    contentSeparator: PropTypes.string.isRequired,
    contentRight: PropTypes.string.isRequired,
    contentImage: PropTypes.string.isRequired,
  }).isRequired
};

export default withStyles(classes)(Profile);