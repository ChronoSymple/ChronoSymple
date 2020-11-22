import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DiseaseCard from './DiseaseCard/DiseaseCard';
//import { PatientPropTypes } from '../../MyPropTypes';
import i18n from 'i18next';
import Api from '../../Api';
import Request from '../Request';

class Patient extends PureComponent {
  state = {
    init: false,
    error: null,
    diseases: []
  };

  componentDidMount = () => this.init();

  init = async() => {
    try {
      const patientData = await Api.getPatient(this.props.token, this.props.patientID);
      const {first_name: firstname, last_name: lastname, ...others} = patientData;
      const formalizeData = {...others, firstname, lastname};
      this.setState({init:true, ...formalizeData});
      try {
        const rawdata = await Api.getPatientNotes(this.props.token, this.props.patientID);
        const diseases = rawdata.map( e => ({ id: e.id, name: e.general_unit.name}));
        this.setState({diseases});
      } catch (e) {
        //console.warn(e);
      }
    } catch (error) {
      this.setState({error});
    }
  }

  render() {
    const {
      error,
      init,
      civility,
      firstname,
      lastname,
      birthdate,
      diseases,
    } = this.state;
    return (
      <Request loading={!init} error={error}>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${civility}. ${lastname} ${firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              { `${i18n.t('born')} ${birthdate}`}
            </Typography>
          </CardContent>
        </Card>
        {diseases.map(({name, id}) => 
          <DiseaseCard key={name} diseaseName={name} token={this.props.token} unitId={id} defaultOpen={JSON.parse(window.localStorage.getItem('selectedDiseases') || window.localStorage.getItem('diseases') || '[]')[name] === true}/>)
        }
      </Request>
    );
  }
}

Patient.propTypes = {
  patientID: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default Patient;