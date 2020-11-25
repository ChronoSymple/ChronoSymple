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
import i18n from 'i18next';

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
      askingApi: true,
      lang: i18n.t('language'),
      value: 'Fra',
      error: ''
    };
  }

  setPassword = e => {
    const password = e.target.value;
    this.setState(s => ({
      profile: {
        ...s.profile,
        password,
      },
      error: '',
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

  handleChangeSettings  = () => {
    if (i18n.language === 'en') {
      localStorage.setItem('lang', 'fr');
      i18n.changeLanguage('fr');
      this.setState({lang: 'English', value: 'en'});
    } else if (i18n.language === 'fr') {
      localStorage.setItem('lang', 'en');
      i18n.changeLanguage('en');
      this.setState({lang: 'Français', value: 'fr'});
    } else {
      i18n.changeLanguage('en');
      this.setState({lang: 'Français', value: 'fr'});
    }
    this.forceUpdate();
    window.location.reload(false);
    //this.props.appController.forceUpdate();
  };

  changeEmail = e => {
    const email = e.target.value;
    this.setState(s => ({ profile : { ...s.profile, email } }));

  }

  save = async() => {
    try {
      this.setState({askingApi: true});
      const profile = await Api.updateMyProfile(localStorage.getItem('myToken'), this.state.profile);
      //console.log(profile);
      this.setState({defaultProfile: profile, profile: {}, askingApi: false});
    } catch {
      this.setState({error: 'Mauvais mot de passe ou erreur serveur', askingApi: false});
    }
  }
  
  async componentDidMount() {
    try {
      const profile = await Api.getMyProfile(localStorage.getItem('myToken'));
      this.setState({defaultProfile: profile, askingApi: false});
      //console.log(profile);
    } catch (err) {
      //console.error(err);
    }
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      profile,
      defaultProfile,
      askingApi,
      error
    } = this.state;
    return (<Card>
      <CardContent>
        <Typography variant="h4">{i18n.t('profile')}</Typography>
        <Divider />
        <div className={classes.container}>
          <div className={classes.contentLeft}>
            <div className={classes.contentImage}>
              <img src={profile.picture || defaultProfile.picture || gecko} width="200" height="200" alt="profilePicture" />
            </div>
            <label htmlFor="avatar">{i18n.t('choose')}</label>
            <input type="file" name='avatar' onChange={this.changeImageProfile} />
            {/* <br/>
            <Alert/> */}
          </div>
          <div className={classes.contentSeparator}></div>
          <div className={classes.contentRight}>
            <Typography variant="h5">
              {`${defaultProfile.civility || ''} ${defaultProfile.last_name || ''} ${defaultProfile.first_name || ''}`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {i18n.t('specialities')}
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
            <TextField fullWidth value={profile.email || defaultProfile.email || ''}label="Email" onChange={this.changeEmail}/>
            <TextField type='password' fullWidth value={profile.password || ''} label={i18n.t('password')} onChange={this.setPassword} />
            <br/><br/>
            <Button variant='contained' style={{ background: '#62BE87' }} onClick={this.save} disabled={askingApi || profile.password === '' || profile.password === undefined}>Modifiez</Button>
            {askingApi && <CircularProgress style={{marginLeft: 10}} size={30} />}
            <p>{i18n.t('changePasswd')}</p>
            <p style={{color: 'red'}}>{error}</p>
          </div>
        </div>
        <Typography variant="h4">{i18n.t('settings')}</Typography>
        <br/>
        <br/>
        <Divider />
        <Typography variant="h5">
          {i18n.t('lang')}
        </Typography>
        <Button onClick={this.handleChangeSettings} variant='contained' style={{ background: '#62BE87' }}>{this.state.lang}</Button>
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