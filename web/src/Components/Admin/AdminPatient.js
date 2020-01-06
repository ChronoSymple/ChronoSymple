import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { UserPropTypes } from '../../MyPropTypes';
import { Button } from '@material-ui/core';
import AdminDiseaseCard from './AdminDiseaseCard';
import Api from '../../Api';

class AdminPatient extends PureComponent {
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
      await Api.updatePatient(this.props.token, {
        id: this.props.client.patient.id,
        email: this.state.email
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const {
      client
    } = this.props;
    const patient = client.patient;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${patient.civility}. ${patient.lastname} ${patient.firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`Née le ${patient.birthdate}`}
            </Typography>
            <TextField value={this.state.email || patient.email || ''} onChange={this.onEmailChange} label='Email'/>
            <Button variant='contained' color='secondary' style={{margin:'5px 0'}} onClick={this.onClickChangeEmail}>Set New Email</Button>
            <br/>
            <Button variant='contained' color='primary' style={{margin:'5px 0'}}>Send reset password</Button>
          </CardContent>
        </Card>
        {patient.diseases && Object.keys(patient.diseases).map(key => 
          <AdminDiseaseCard key={key} diseaseName={key} data={patient.diseases[key]} defaultOpen={client.selected[key] === true}/>)
        }
      </div>
    );
  }
}

AdminPatient.propTypes = {
  client: PropTypes.shape({
    patient: UserPropTypes.isRequired,
    selected: PropTypes.object
  }).isRequired,
  token: PropTypes.string.isRequired
};

export default AdminPatient;