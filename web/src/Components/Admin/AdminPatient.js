import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { PatientPropTypes } from '../../MyPropTypes';
import { Button } from '@material-ui/core';
import AdminDiseaseCard from './AdminDiseaseCard';

class AdminPatient extends PureComponent {
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
            <TextField defaultValue={patient.email || ''} label='Email'/>
            <Button variant='contained' color='secondary' style={{margin:'5px 0'}}>Set New Email</Button>
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
    patient: PatientPropTypes.isRequired,
    selected: PropTypes.object
  }).isRequired
};

export default AdminPatient;