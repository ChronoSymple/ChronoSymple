import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Api from '../../Api';

class AdminCreateDoctor extends Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(props.location.search);
    const firstname = values.firstname || '';
    const lastname = values.lastname || '';
    const email = values.email || '';
    const address = values.address || '';
    const birthdate = values.birthdate || '';
    const civility = values.civility || 'Mr';
    const phone = values.phone || '';

    this.state = {
      firstname,
      lastname,
      email,
      specialities: [],
      error: null,
      init: false,
      generalUnits: [],
      civility,
      birthdate,
      password: '',
      address,
      phone,
    };
  }
  
  getGeneralUnits = async() => {
    const res = await Api.getGeneralUnits(this.props.token);
    const generalUnits = res.modules;
    this.setState({generalUnits});
  }

  componentDidMount() {
    this.getGeneralUnits();
  }
  setAddress = e => {
    const address = e.target.value;
    this.setState({address});
  }
  setPhone = e => {
    const phone = e.target.value;
    this.setState({phone});
  }
  setPassword = e => {
    const password = e.target.value;
    this.setState({password});
  }
  setLastname = e => {
    const lastname = e.target.value;
    this.setState({lastname});
  }
  setFirstname = e => {
    const firstname = e.target.value;
    this.setState({firstname});
  }
  setEmail = e => {
    const email = e.target.value;
    this.setState({email});
  }
  setCivility = e => {
    const civility = e.target.value;
    this.setState({civility});
  }
  setBirthdate = e => {
    const birthdate = e.target.value;
    this.setState({birthdate});
  }
  diseaseChange = e => {
    this.setState(state => {
      const specialities = state.specialities;
      if (specialities.includes(e)) {
        return {specialities: specialities.filter(k => k !== e)};
      } else {
        return {specialities: [...specialities, e]};
      }
    });
  }
  isSelected = e => this.state.specialities.includes(e);
  send = async() => {
    const birthdateDate = new Date(this.state.birthdate);
    if (isNaN(birthdateDate.getTime())) {
      return;
    }
    const birthdate = `${birthdateDate.getDate()}/${birthdateDate.getMonth() + 1}/${birthdateDate.getFullYear()}`;
    await Api.adminCreateDoctor(localStorage.getItem('myToken'), {
      'first_name': this.state.firstname,
      'last_name': this.state.lastname,
      email: this.state.email,
      'default_units': this.state.specialities,
      'phone_number': this.state.phone,
      birthdate,
      civility: this.state.civility,
      picture: '',
      address: this.state.address,
      password: this.state.password,
    })
    window.location = '/';
  }
  render() {
    const {
      lastname,
      firstname,
      email,
      generalUnits,
      civility,
      birthdate,
      phone,
      password,
      address,
    } = this.state;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">Add Doctor</Typography>
            <br/>
            <Typography variant="h6">Civility</Typography>
            <RadioGroup value={civility} onChange={this.setCivility}>
              <FormControlLabel value="Mme" control={<Radio />} label="Female" />
              <FormControlLabel value="Mr" control={<Radio />} label="Male" />
            </RadioGroup>
            <TextField fullWidth id="lastname" label="Nom" value={lastname} onChange={this.setLastname}/>
            <br/>
            <TextField fullWidth id="firstname" label="Prénom" value={firstname} onChange={this.setFirstname}/>
            <br/>
            <TextField fullWidth id="email" label="Email" value={email} onChange={this.setEmail}/>
            <br/>
            <TextField fullWidth id="phoneNumber" label="Numéro de téléphone" value={phone} onChange={this.setPhone}/>
            <br/>
            <TextField fullWidth id="password" label="Password" type='Password' value={password} onChange={this.setPassword}/>
            <br/>
            <TextField fullWidth id="address" label="Adresse" value={address} onChange={this.setAddress}/>
            <br/>
            <br/>
            <TextField fullWidth
              id="date"
              label="Birthday"
              type="date"
              value={birthdate}
              onChange={this.setBirthdate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br/>
            <br/>
            {
              generalUnits.map(e => 
                <Chip
                  key={e.id} id={e.id}
                  label={e.name}
                  onClick={() => this.diseaseChange(e.id)}
                  color={this.isSelected(e.id) ? 'secondary' : 'default'}
                />
              )
            }
            <br/>
            <Button variant="contained" color="secondary" style={{margin: 10}} onClick={this.send}>Create</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AdminCreateDoctor.propTypes = {
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default AdminCreateDoctor;
