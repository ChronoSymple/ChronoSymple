import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Api from '../../Api';
import Request from '../Request';

class AdminDoctor extends PureComponent {
  state = {
    doctor: {},
    loading: true,
  };

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
        id: this.props.doctorID,
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