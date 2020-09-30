import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import diseases from '../../diseases';

class AdminCreateDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      specialities: [],
      error: null,
      init: false,
    };
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const firstname = values.firstname || '';
    const lastname = values.lastname || '';
    const email = values.email || '';
    this.setState({
      firstname,
      lastname,
      email,
    })
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

  render() {
    const {
      lastname,
      firstname,
      email
    } = this.state;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">Add Doctor</Typography>
            <TextField fullWidth id="lastname" label="Nom" value={lastname} onChange={this.setLastname}/>
            <br/>
            <TextField fullWidth id="firstname" label="Prénom" value={firstname} onChange={this.setFirstname}/>
            <br/>
            <TextField fullWidth id="email" label="Email" value={email} onChange={this.setEmail}/>
            <br/>
            <br/>
            {
              Object.keys(diseases).map(key =>
                <Chip
                  key={key} id={key}
                  label={diseases[key].fullName}
                  onClick={() => this.diseaseChange(key)}
                  color={this.isSelected(key) ? 'secondary' : 'default'}
                />
              )
            }
            <br/>
            <Button variant="contained" color="secondary" style={{margin: 10}}>Create</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AdminCreateDoctor.propTypes = {
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

export default AdminCreateDoctor;
