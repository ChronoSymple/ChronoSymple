import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DiseaseCard from './DiseaseCard/DiseaseCard';
import { PatientPropTypes } from '../../MyPropTypes';

class Patient extends PureComponent {
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
          </CardContent>
        </Card>
        {patient.diseases && Object.keys(patient.diseases).map(key => 
          <DiseaseCard key={key} diseaseName={key} data={patient.diseases[key]} defaultOpen={client.selected[key] === true}/>)
        }
      </div>
    );
  }
}

Patient.propTypes = {
  client: PropTypes.shape({
    patient: PatientPropTypes.isRequired,
    selected: PropTypes.object
  }).isRequired
};

export default Patient;