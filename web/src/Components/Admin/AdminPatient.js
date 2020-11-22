import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
//import { UserPropTypes } from '../../MyPropTypes';
import { Button } from '@material-ui/core';
import AdminDiseaseCard from './AdminDiseaseCard';
import Api from '../../Api';
import Request from '../Request';

class AdminPatient extends PureComponent {
  state = {
    loading: true,
    patient: {},
    units: [],
    generalUnits: [],
    load: true,
  };
  chipClick = async unitID => {
    const patientID = Number(this.props.patientID);
    if (this.state.units.includes(unitID)) {
      await Api.removePatientUnit(this.props.token, patientID, unitID);
      this.setState(state => ({units: state.units.filter(e => e !== unitID)}));
    } else {
      await Api.addPatientUnit(this.props.token, patientID, unitID);
      this.setState(state => ({units: [...state.units, unitID]}));
    }
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
      await Api.updatePatient(this.props.token, {
        id: Number(this.props.patientID),
        email: this.state.email
      });
    } catch (error) {
      //console.log(error);
    }
  }
  
  init = async() => {
    const ID = Number(this.props.patientID);
    const patientRequest = Api.getPatientsAsAdmin(this.props.token).then(rawdata => {
      const tmppatient = rawdata.filter(e => e !== null).filter(e => e.id === ID)[0];
      if (tmppatient !== undefined) {
        const {first_name: firstname, last_name: lastname, ...tmp} = tmppatient;
        const patient = {...tmp, firstname, lastname};
        this.setState({patient, });
      } else {
        this.setState({error: 'Patient not found'});
      }
    });
    const promiseUnits = Api.getPatientUnits(this.props.token, ID).then(resUnits => {
      const units = resUnits.map(e => e.id);
      this.setState({units});
    });
    const promiseGeneralUnits = Api.getGeneralUnits(this.props.token).then(resUnits => {
      const generalUnits = resUnits.modules;
      this.setState({generalUnits});

    });
    await Promise.all([patientRequest, promiseUnits, promiseGeneralUnits]);
    this.setState({loading: false});
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const {
      loading,
      error,
      patient,
      generalUnits,
      units,
    } = this.state;
    return (
      <Request loading={loading} error={error}>
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
            <div>
              {
                generalUnits.map(unit => <Chip
                  key={unit.id}
                  color={units.includes(unit.id) ? 'primary' : 'default'}
                  label={unit.name}
                  onClick={() => this.chipClick(unit.id)} />)
              }
              {this.state.loading && <CircularProgress />}
            </div>
          </CardContent>
        </Card>
        {patient.diseases && Object.keys(patient.diseases).map(key => 
          <AdminDiseaseCard key={key} diseaseName={key} data={patient.diseases[key]} defaultOpen={true || {}.selected[key] === true}/>)
        }
      </Request>
    );
  }
}

AdminPatient.propTypes = {
  patientID: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default AdminPatient;