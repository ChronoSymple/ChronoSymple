import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import Api from '../../Api';
import Request from '../Request';
import Chip from '@material-ui/core/Chip';
class AdminDoctor extends PureComponent {
  state = {
    doctor: {},
    loading: true,
    units: [],
    generalUnits: [],
    load: false,
  };
  timer = -1;

  chipClick = async unitID => {
    const doctorID = Number(this.props.doctorID);
    if (this.state.units.includes(unitID)) {
      await Api.removeDoctorUnit(this.props.token, doctorID, unitID);
      this.setState(state => ({units: state.units.filter(e => e !== unitID)}));
    } else {
      await Api.addDoctorUnit(this.props.token, doctorID, unitID);
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
      await Api.updateDoctor(this.props.token, {
        id: Number(this.props.doctorID),
        email: this.state.email
      });
    } catch (error) {
      //console.error(error);
    }
  }

    
  init = async() => {
    const ID = Number(this.props.doctorID);
    const promiseDoctor = Api.getDoctorsAsAdmin(this.props.token).then(rawdata => {
      const tmpdoctor = rawdata.filter(e => e != null).filter(e => e.id === ID)[0];
      if (tmpdoctor !== undefined) {
        const {first_name: firstname, last_name: lastname, ...tmp} = tmpdoctor;
        const doctor = {...tmp, firstname, lastname};
        this.setState({doctor});
      } else {
        this.setState({error: 'Doctor not found'});
      }
    });
    const promiseUnits = Api.getDoctorUnits(this.props.token, ID).then(resUnits => {
      const units = resUnits.map(e => e.id);
      this.setState({units});
      //console.log(units);
    });
    const promiseGeneralUnits = Api.getGeneralUnits(this.props.token).then(resUnits => {
      const generalUnits = resUnits.modules;
      this.setState({generalUnits});
      //console.log(generalUnits);
    });
    await Promise.all([promiseDoctor, promiseUnits, promiseGeneralUnits]).then(() => {
      this.setState({loading: false});
    });
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const {
      doctor,
      loading,
      error,
      units,
      generalUnits
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
            <div>
              {
                generalUnits.map(unit => <Chip
                  key={unit.id}
                  color={units.includes(unit.id) ? 'primary' : 'default'}
                  label={unit.name}
                  onClick={() => this.chipClick(unit.id)} />)
              }
              {this.state.load && <CircularProgress />}
            </div>
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