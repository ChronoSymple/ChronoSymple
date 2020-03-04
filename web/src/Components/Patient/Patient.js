import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DiseaseCard from './DiseaseCard/DiseaseCard';
import { PatientPropTypes } from '../../MyPropTypes';
import i18n from 'i18next';
import star1 from '../../assets/Img/filledStar.png'
import star2 from '../../assets/Img/emptyStar.png'
import boy from '../../assets/Img/boy.png'
import girl from '../../assets/Img/girl.png'
import baby from '../../assets/Img/baby.png'
import woman from '../../assets/Img/woman.png'
import man from '../../assets/Img/man.png'

class Patient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: star1,
      check: false,
      patients: [woman, man, boy, girl, baby],
      patSelected: man,
      index: 0
    };
  }
  patientsChange = () => {
    if (this.state.index === 5)
      this.state.index = 0;
    this.setState({patSelected: this.state.patients[this.state.index], index: this.state.index + 1});
  }
  handleChange = () => {
    if (this.state.check === false)
      this.setState({selectedImg: star2, check: true})
    else
      this.setState({selectedImg: star1, check: false})
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
              { i18n.t('born') + ` ${patient.birthdate}`}
            </Typography>
            <img src={this.state.selectedImg} onClick={this.handleChange} width="50" height="50"/>
            <img src={this.state.patSelected} onClick={this.patientsChange} width="60" height="100"/>
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