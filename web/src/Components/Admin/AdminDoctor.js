import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Api from '../../Api';
class AdminDoctor extends PureComponent {
  state = {};
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
        id: this.props.doctor.id,
        email: this.state.email
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const {
      doctor
    } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

AdminDoctor.propTypes = {
  doctor: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

export default AdminDoctor;