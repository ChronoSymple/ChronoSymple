import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DiseaseCard from './DiseaseCard/DiseaseCard';
//import { PatientPropTypes } from '../../MyPropTypes';
import i18n from 'i18next';
import star1 from '../../assets/Img/filledStar.png'
import star2 from '../../assets/Img/emptyStar.png'
import boy from '../../assets/Img/boy.png'
import girl from '../../assets/Img/girl.png'
import baby from '../../assets/Img/baby.png'
import woman from '../../assets/Img/woman.png'
import man from '../../assets/Img/man.png'
import Api from '../../Api';
import CircularProgress from '@material-ui/core/CircularProgress';

class Patient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: star1,
      check: false,
      patients: [woman, man, boy, girl, baby],
      patSelected: man,
      index: 0,
      init: false,
      error: null
    };
  }
  patientsChange = () => {
    this.setState(state => ({patSelected: this.state.patients[this.state.index], index: state.index === 5 ? 0 : state.index + 1}));
  }
  handleChange = () => {
    if (this.state.check === false)
      this.setState({selectedImg: star2, check: true})
    else
      this.setState({selectedImg: star1, check: false})
  }

  componentDidMount() {
    this.init();
  }

  init = async() => {
    const id = this.props.patientID;
    try {
      const patientData = await Api.getPatient(this.props.token, id);
      //TODO: Use real data
      //const {first_name, last_name, ...others} = patientData;
      //const formalizeData = {...others, firstname: first_name, lastname: last_name};
      const data = {id: 1, firstname: 'Carl', lastname: 'DE GENTILE', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: {
        diabetes: [
          { date: new Date('2019-10-20T09:00:00Z'), data: 80 },
          { date: new Date('2019-10-20T12:00:00Z'), data: 90 },
          { date: new Date('2019-10-20T13:00:00Z'), data: 135 },
          { date: new Date('2019-10-20T20:00:00Z'), data: 100 },
          { date: new Date('2019-10-21T09:00:00Z'), data: 65 },
          { date: new Date('2019-10-21T12:00:00Z'), data: 74 },
          { date: new Date('2019-10-21T20:00:00Z'), data: 85 },
          { date: new Date('2019-10-22T09:00:00Z'), data: 97 },
          { date: new Date('2019-10-22T12:00:00Z'), data: 95 },
          { date: new Date('2019-10-22T20:00:00Z'), data: 71 },
          { date: new Date('2019-10-23T09:00:00Z'), data: 93 },
          { date: new Date('2019-10-23T12:00:00Z'), data: 81 },
          { date: new Date('2019-10-23T20:00:00Z'), data: 73 },
          { date: new Date('2019-10-24T09:00:00Z'), data: 96 },
          { date: new Date('2019-10-24T12:00:00Z'), data: 71 },
          { date: new Date('2019-10-24T20:00:00Z'), data: 76 },
          { date: new Date('2019-10-25T09:00:00Z'), data: 94 },
          { date: new Date('2019-10-25T12:00:00Z'), data: 97 },
          { date: new Date('2019-10-25T20:00:00Z'), data: 88 },
          { date: new Date('2019-10-26T09:00:00Z'), data: 55 },
          { date: new Date('2019-10-26T12:00:00Z'), data: 78 },
          { date: new Date('2019-10-26T20:00:00Z'), data: 90 },
        ]
      }}
      this.setState({init:true, ...data});
    } catch (error) {
      this.setState({error})
    }
  }

  render() {
    if (this.state.error) {
      return (<p>{this.state.error.toString()}</p>)
    }
    if (!this.state.init) {
      return (<CircularProgress />);
    }
    const {
      civility,
      firstname,
      lastname,
      birthdate,
      diseases
    } = this.state;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${civility}. ${lastname} ${firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              { i18n.t('born') + ` ${birthdate}`}
            </Typography>
            <img src={this.state.selectedImg} alt="favorite" onClick={this.handleChange} width="50" height="50"/>
            <img src={this.state.patSelected} alt="type" onClick={this.patientsChange} width="60" height="100"/>
          </CardContent>
        </Card>
        {diseases && Object.keys(diseases).map(key => 
          <DiseaseCard key={key} diseaseName={key} data={diseases[key]} defaultOpen={JSON.parse(window.localStorage.getItem('selectedDiseases') || window.localStorage.getItem('diseases') || [])[key] === true}/>)
        }
      </div>
    );
  }
}

Patient.propTypes = {
  patientID: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default Patient;