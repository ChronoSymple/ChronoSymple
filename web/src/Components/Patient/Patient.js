import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DiseaseCard from './DiseaseCard/DiseaseCard';
//import { PatientPropTypes } from '../../MyPropTypes';
import i18n from 'i18next';
import star1 from '../../assets/Img/filledStar.png';
import star2 from '../../assets/Img/emptyStar.png';
import boy from '../../assets/Img/boy.png';
import girl from '../../assets/Img/girl.png';
import baby from '../../assets/Img/baby.png';
import woman from '../../assets/Img/woman.png';
import man from '../../assets/Img/man.png';
import Api from '../../Api';
import Request from '../Request';

const patients = [man, woman, boy, girl, baby];

class Patient extends PureComponent {
  state = {
    isFav: false,
    type: 0,
    init: false,
    error: null,
    diseases: []
  };

  patientsChange = () => this.setState(({type}) => ({type: (type + 1) % patients.length}));

  handleChange = () => this.setState(({isFav}) => ({isFav: !isFav}));

  componentDidMount = () => this.init();

  init = async() => {
    try {
      const patientData = await Api.getPatient(this.props.token, this.props.patientID);
      const {first_name: firstname, last_name: lastname, ...others} = patientData;
      const formalizeData = {...others, firstname, lastname};
      /* TODO: Remove fake data
      const data = {id: 1, firstname: 'Carl', lastname: 'DE GENTILE', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: [
        { name: 'diabetes', data: }
      ]}
      */
      this.setState({init:true, ...formalizeData});
      try {
        const rawdata = await Api.getPatientNotes(this.props.token, this.props.patientID);
        const diseases = rawdata.map( e => ({ id: e.id, name: e.general_unit.name}));
        //const patientNotes = await Api.getNotes(this.props.token, this.props.patientID);
        this.setState({diseases});
      } catch (e) {
        console.warn(e);
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
      type,
      isFav
    } = this.state;
    return (
      <Request loading={!init} error={error}>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${civility}. ${lastname} ${firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              { `${i18n.t('born')} ${birthdate}`}
            </Typography>
            <img src={isFav ? star2 : star1} alt="favorite" onClick={this.handleChange} width="50" height="50"/>
            <img src={patients[type]} alt="type" onClick={this.patientsChange} width="60" height="100"/>
          </CardContent>
        </Card>
        {diseases.map(({name, id}) => 
          <DiseaseCard key={name} diseaseName={name} token={this.props.token} unitId={id} defaultOpen={JSON.parse(window.localStorage.getItem('selectedDiseases') || window.localStorage.getItem('diseases') || [])[name] === true}/>)
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