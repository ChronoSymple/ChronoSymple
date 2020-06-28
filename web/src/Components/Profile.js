import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
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
      profile: {},
      defaultProfile: {},
      askingApi: true
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
  changeImageProfile = e => {
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

  changeEmail = e => {
    const email = e.target.value;
    this.setState(s => ({ profile : { ...s.profile, email } }));

  }

  save = async() => {
    try {
      this.setState({askingApi: true});
      const profile = await Api.updateMyProfile(localStorage.getItem('myToken'), this.state.profile);
      console.log(profile);
      this.setState({defaultProfile: profile, profile: {}, askingApi: false});
    } catch (err) {
      console.error(err);
    }
  }
  
  async componentDidMount() {
    try {
      const profile = await Api.getMyProfile(localStorage.getItem('myToken'));
      this.setState({defaultProfile: profile, askingApi: false});
      console.log(profile);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      profile,
      defaultProfile,
      askingApi
    } = this.state;
    return (<Card>
      <CardContent>
        <Typography variant="h4">Profile</Typography>
        <Divider />
        <div className={classes.container}>
          <div className={classes.contentLeft}>
            <div className={classes.contentImage}>
              <img src={profile.picture || defaultProfile.picture || gecko} width="200" height="200" alt="profilePicture" />
            </div>
            <input type="file" onChange={this.changeImageProfile} />
            {/* <br/>
            <Alert/> */}
          </div>
          <div className={classes.contentSeparator}></div>
          <div className={classes.contentRight}>
            <Typography variant="h5">
              {`${defaultProfile.civility || ''} ${defaultProfile.last_name || ''} ${defaultProfile.first_name || ''}`}
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
            <TextField type='password' fullWidth value={profile.password || ''} label="Mot de passe" onChange={this.setPassword} />
            <TextField fullWidth value={profile.email || defaultProfile.email || ''}label="Email" onChange={this.changeEmail}/>
            <br/><br/>
            <Button variant='contained' color="primary" onClick={this.save} disabled={askingApi || profile.password === '' || profile.password === undefined}>Modifiez</Button>
            {askingApi && <CircularProgress style={{marginLeft: 10}} size={30} />}
            <p>* To change any information you need to enter your password</p>
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