import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import diseases from '../diseases';
import { withStyles, Divider, Button, TextField } from '@material-ui/core';
import gecko from '../assets/Img/Gecko.png';
import Api from '../Api';
//import Alert from '../Components/Alert/Alert';

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
      selected: JSON.parse(localStorage.getItem('diseases') || '{}'),
      profile: {}
    };
  }

  setPassword = e => {
    const password = e.target.value;
    this.setState(s => ({
      profile: {
        ...s.profile,
        password
      }
    }));
  }

  chipClick = disease => {
    this.setState(state => {
      const selected = { ...state.selected, [disease]: !state.selected[disease] };
      localStorage.setItem('diseases', JSON.stringify(selected));
      return ({ selected });
    });
  }
  uploadImageProfile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async() => {
      const picture = reader.result;
      this.setState(s => ({ profile : { ...s.profile, picture } }));
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  save = async() => {
    try {
      await Api.updateMyProfile(localStorage.getItem('myToken'), this.state.profile);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      profile
    } = this.state;
    return (<Card>
      <CardContent>
        <Typography variant="h4">Profile</Typography>
        <Divider />
        <div className={classes.container}>
          <div className={classes.contentLeft}>
            <div className={classes.contentImage}>
              <img src={gecko} width="200" height="200" alt="profilePicture" />
            </div>
            <input type="file" onChange={this.uploadImageProfile} />
            {/* <br/>
            <Alert/> */}
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
            <TextField fullWidth value={profile.password || ''} label="Mot de passe" onChange={this.setPassword} />
            <TextField fullWidth label="Email"/>
            <br/><br/>
            <Button variant='contained' color="primary" onClick={this.save}>Modifiez</Button>
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