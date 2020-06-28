import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import Api from '../../Api';
import Request from '../Request';
import Chip from '@material-ui/core/Chip';
import diseases from '../../diseases';
class AdminDoctor extends PureComponent {
  state = {
    doctor: {},
    loading: true,
    selected: [],
    load: false,
  };
  timer = -1;

  chipClick = disease => {
    this.setState(state => {
      const selected = { ...state.selected, [disease]: !state.selected[disease] };
      localStorage.setItem('diseases', JSON.stringify(selected));
      return ({ selected, load: true });
    });
    clearInterval(this.timer);
    this.timer = setTimeout(() => this.setState({load: false}), 1000 + ((Math.random() - 0.5) * 600))
  }
  onEmailChange = e => {
    const newValue = e.target.value;
    this.setState({email: newValue});
  }
  onClickChangeEmail = async() => {
    if (this.state.email === undefined) {
      return;
    }
    try {
      await Api.updateDoctor(this.props.token, {
        id: Number(this.props.doctorID),
        email: this.state.email
      });
    } catch (error) {
      console.error(error);
    }
  }

    
  init = async() => {
    const ID = Number(this.props.doctorID);
    const rawdata = await Api.getDoctorsAsAdmin(this.props.token);
    const tmpdoctor = rawdata.filter(e => e != null).filter(e => e.id === ID)[0];
    if (tmpdoctor !== undefined) {
      const {first_name: firstname, last_name: lastname, ...tmp} = tmpdoctor;
      const doctor = {...tmp, firstname, lastname};
      this.setState({doctor, loading: false});
    } else {
      this.setState({error: 'Doctor not found'});
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const {
      doctor,
      loading,
      error
    } = this.state;
    return (
      <Request loading={loading} error={error}>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${doctor.civility}. ${doctor.lastname} ${doctor.firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`Née le ${doctor.birthdate}`}
            </Typography>
            <TextField value={this.state.email || doctor.email || ''} onChange={this.onEmailChange} label='Email'/>
            <Button variant='contained' color='secondary' style={{margin:'5px 0'}} onClick={this.onClickChangeEmail}>Set New Email</Button>
            <br/>
            <Button variant='contained' color='primary' style={{margin:'5px 0'}}>Send reset password</Button>
            <div>
              {
                Object.keys(diseases).map(key => <Chip
                  key={key}
                  color={this.state.selected[key] ? 'primary' : 'default'}
                  label={diseases[key].fullName}
                  onClick={() => this.chipClick(key)} />)
              }
              {this.state.load && <CircularProgress />}
            </div>
          </CardContent>
        </Card>
      </Request>
    );
  }
}

AdminDoctor.propTypes = {
  doctorID: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default AdminDoctor;